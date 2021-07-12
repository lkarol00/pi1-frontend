import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventMqttService {

  private endpoint: string;

  constructor( private _mqttService: MqttService ) {
    this.endpoint = 'data';
  }

  topic(deviceId: string): Observable<IMqttMessage> {
    let topicName = `/${this.endpoint}`; ///${deviceId}
    return this._mqttService.observe(topicName);
  }

 /* sendmsg(): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish(this.topicname, this.msg, { qos: 1, retain: true })
    this.msg = ''
  }*/

}
