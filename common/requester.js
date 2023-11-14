import _ from "lodash";
import axios from "axios";

export default class Requester {
  constructor(url, headers, timeout = 10000) {
    this.timeout = timeout;
    this.instance = axios.create({
      baseURL: url,
      timeout: this.timeout,
      headers,
    });
    this.activeURL = "";
  }

  on(url) {
    this.activeURL = url;
    return this;
  }

  injectQueryParam(paramName, paramValue) {
    if (!paramValue) return;
    const op = this._isFirstParam(this.activeURL) ? "?" : "&";
    this.activeURL += `${op}${paramName}=${paramValue}`;
    return this;
  }

  _createRequest(requestType, payload, headers = {}, timeout) {
    if (!this.activeURL) throw new Error("No active URL set");

    return this.instance.request({
      method: requestType,
      url: this.activeURL,
      data: payload,
      headers,
      timeout: timeout || this.timeout,
    });
  }

  get(payload, headers = {}, timeout) {
    return this._createRequest("GET", payload, headers, timeout);
  }

  post(payload, headers = {}, timeout) {
    return this._createRequest("POST", payload, headers, timeout);
  }

  put(payload, headers = {}) {
    return this._createRequest("PUT", payload, headers);
  }

  delete(payload, headers = {}) {
    return this._createRequest("DELETE", payload, headers);
  }

  patch(payload, headers = {}) {
    return this._createRequest("PATCH", payload, headers);
  }

  _isFirstParam(url) {
    return _.isNil(url) || url.indexOf("?") === -1;
  }
}
