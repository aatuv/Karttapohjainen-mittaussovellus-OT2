#!/usr/bin/env python

# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project root for
# full license information.

import sys
import iothub_client
import wifi
import time
import datetime
import os
import urllib
import getpass

from iothub_client import IoTHubClient, IoTHubClientError, IoTHubTransportProvider, IoTHubClientResult
from iothub_client import IoTHubMessage, IoTHubMessageDispositionResult, IoTHubError, DeviceMethodReturnValue
from iothub_client import IoTHubClientRetryPolicy, GetRetryPolicyReturnValue
from iothub_client_args import get_iothub_opt, OptionError

from ruuvitag_sensor.ruuvitag import RuuviTag
from ruuvitag_sensor.ruuvi import RuuviTagSensor
import ruuvitag_sensor.log
#lampotila, ilmanpaine ja ilmankosteus
temperature = 0
pressure = 0
humidity = 0



SEND_CALLBACKS = 0


#protokolla mqtt 
PROTOCOL = IoTHubTransportProvider.MQTT

# Stringin formaatti:
# "HostName=<host_name>;DeviceId=<device_id>;SharedAccessKey=<device_key>"
CONNECTION_STRING = "HostName=OT2.azure-devices.net;DeviceId=raspberry;SharedAccessKey=jDDnZiwYXp7aWYQ8Hm7fJ04/BcQbES/2TUkj3S1b4ao="
#macosoitteet laitteitten erotteluun
macs = ['F1:BB:17:CC:A9:F1', 'D5:33:97:BA:3A:E6']
#iothubiin lahetettava tieto
MSG_TXT = "{\"deviceId\": \"%s \",\"temperature\": %.2f,\"humidity\": %.2f,\"pressure\": %.2f,\"time\": \"%s\"}"
#MSG_TXT_ERROR = "{\"error_deviceId\": \"%s \",\"error_message\": \"%s\",\"error_time\": \"%s\"}"

def send_confirmation_callback(message, result, user_context):
    global SEND_CALLBACKS
    #print ( "Confirmation[%d] received for message with result = %s" % (user_context, result) )
    map_properties = message.properties()
    #print ( "    message_id: %s" % message.message_id )
    #print ( "    correlation_id: %s" % message.correlation_id )
    key_value_pair = map_properties.get_internals()
    #print ( "    Properties: %s" % key_value_pair )
    SEND_CALLBACKS += 1
    




def iothub_client_init():
    client = IoTHubClient(CONNECTION_STRING, PROTOCOL)
    return client
    
    
def test_internet(host='http://google.com'):
    try:
        urllib.urlopen(host)
        return True
    except:
        return False
        
def Search():
    wifilist = []

    cells = wifi.Cell.all('wlan0')

    for cell in cells:
        wifilist.append(cell)

    return wifilist
        
def FindFromSearchList(ssid):
    wifilist = Search()

    for cell in wifilist:
        if cell.ssid == ssid:
            return cell

    return False
        
def FindFromSavedList(ssid):
    cell = wifi.Scheme.find('wlan0', ssid)

    if cell:
        return cell

    return False
    
def Add(cell, password=None):
    if not cell:
        return False

    scheme = wifi.Scheme.for_cell('wlan0', cell.ssid, cell, password)
    scheme.save()
    return scheme   
    
def Connect(ssid, password=None):
    cell = FindFromSearchList(ssid)

    if cell:
        savedcell = FindFromSavedList(cell.ssid)

        # Already Saved from Setting
        if savedcell:
            savedcell.activate()
            return cell

        # First time to conenct
        else:
            if cell.encrypted:
                if password:
                    scheme = Add(cell, password)

                    try:
                        scheme.activate()

                    # Wrong Password
                    except wifi.exceptions.ConnectionError:
                        Delete(ssid)
                        return False

                    return cell
                else:
                    return False
            else:
                scheme = Add(cell)

                try:
                    scheme.activate()
                except wifi.exceptions.ConnectionError:
                    Delete(ssid)
                    return False

                return cell
    
    return False

def iothub_client_start():

    try:

        client = iothub_client_init() #alustetaan protokolla 

        if client.protocol == IoTHubTransportProvider.MQTT:
            
            while True:
                
                i = 0 #iteraattori listan lapikaymista varten
                for x in macs: #kaydaan lapi kaikki macs listassa olevat osoitteet
                    print("Haetaan mac osoiteella %s" % (macs[i]))
                    sensor = RuuviTag(macs[i]) #
                    data = sensor.update()  #haetaan sensorin mac osoiteella tieto sensorista ja lisataan tieto data listaan
                    if not data:
                        timenow2 = datetime.datetime.now()
                        timenow2 = timenow2.strftime("%d.%m.%Y %H:%M:%S")
                        macaddress1 = macs[i]
                        i += 1
                        
                        temperature = 0
                        humidity = 0
                        pressure = 0
                        
                        msg_txt_formatted = MSG_TXT % (macaddress1, temperature, humidity, pressure, timenow2)
                        print(msg_txt_formatted)
                        
                        message = IoTHubMessage(msg_txt_formatted)
                    

                        client.send_event_async(message, send_confirmation_callback, None)
                        
                        continue
                    else:
                        print ("")
                        print (i)
                        
                        print (x)
                        print (data)
                        print ("")
                        pressure = data['pressure'] #data taulusta kohdasta pressure lisataan pressure muuttujaan
                        humidity = data['humidity'] # -||-
                        temperature = data['temperature'] # -||-
                        macaddress = macs[i] # -||-
                        i += 1 #lisataan yksi  
                        timenow1 = datetime.datetime.now()
                        timenow1 = timenow1.strftime("%d.%m.%Y %H:%M:%S")
                        print(timenow1)
                        #Can't init device hci0: Connection timed out (110)
                        #Could not open device: No such device


                
                    
                        #MSG_TXT = "{\"deviceId\": \"%s \",\"temperature\": %.2f,\"humidity\": %.2f,\"pressure\": %.2f}"
                        #tehdaan string johon laitetaan oikesiin kohtiin oikeat arvot muuttujista, jolloin saadaan itohubiin oikeanmuotoista dataa 
                        msg_txt_formatted = MSG_TXT % (macaddress, temperature, humidity, pressure, timenow1)
                        print(msg_txt_formatted)
                        
                        message = IoTHubMessage(msg_txt_formatted)
                    

                        client.send_event_async(message, send_confirmation_callback, None)
                        
            
                print ("Odotetaan komentoja")

                
                i = 0 #palautetaan aro nollaan
                
                status = client.get_send_status() #haetaan status esim. BUSY
                print ( "Send status: %s" % status ) 
                print ("Sleeping for 10 sec")
                time.sleep(10) #ohjelma nukkuu 10 sec
            

    except IoTHubError as iothub_error:
        print ( "Unexpected error %s from IoTHub" % iothub_error )
        return
    except KeyboardInterrupt:
        print("")
        print ( "IoTHubClient pysaytetty" )


if __name__ == '__main__': #maini paaohjelma
    
    print ( "\nPython %s" % sys.version )
    print ( "IoT Hub Client for Python" )
    #testataan yhteytta
    
    try:
        (CONNECTION_STRING, PROTOCOL) = get_iothub_opt(sys.argv[1:], CONNECTION_STRING, PROTOCOL)
    except OptionError as option_error:
        print ( option_error )
        usage()
        sys.exit(1)

    print ( "Starting the IoT Hub Python Ruuvitag data collector..." )
    print ( "Protocol %s" % PROTOCOL )
    #print ( "    Connection string=%s" % CONNECTION_STRING )
    #testataan internet yhteytta
    while (test_internet() == False):
        print("Ei internet yhteytta")
        print("valitse SSID")
        os.system("iwlist wlan0 scan | grep ESSID")
        ssid = raw_input("Valitse SSID (esim: @wifi.id): ")
        YN = raw_input("Onko salasanalla suojattu Y/N: ")
        if (YN == "Y" or YN == "y"):
            pswd = getpass.getpass('Salasana:')
            Connect(ssid, pswd)
        elif(YN == "N" or YN == "n"):
            Connect(ssid)
        else:
            print("Vaara arvo!")
            continue
        print ("Sleeping for 10 sec")
        time.sleep(10)
    print("Internet yhteys!")
     
        
    iothub_client_start()