import { Injectable, EventEmitter, OnInit } from '@angular/core';

@Injectable()
export class SessionService {

    private sessionId: number;

    constructor() {
        var splitParts = window.location.href.split('=');
        if (splitParts.length > 1 && splitParts[0].endsWith("session")) {
            this.sessionId = parseInt(splitParts[1]);
        }
    }

    getSessionId() {
        return this.sessionId;
    }

    getUrlForSession(subPath: string) {
        return `api/sessions/${this.sessionId}/${subPath}`;
    }
}
