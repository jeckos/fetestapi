import axios from "axios";

class HttpService {
  #cancelToken = axios.CancelToken;
  isCancel = axios.isCancel;
  cancelSources = {};
  $axios;

  constructor(config) {
    this.$axios = axios.create(config);
  }

  async get(resource, config) {
    return this.$axios.get(resource, config);
  }

  async post(resource, data, config) {
    return this.$axios.post(resource, data, config);
  }

  async put(resource, data, config) {
    return this.$axios.put(resource, data, config);
  }

  async delete(resource, config) {
    return this.$axios.delete(resource, config);
  }

  async customRequest(config) {
    return this.$axios(config);
  }

  getCancelToken(cancelSource) {
    return this.cancelSources[cancelSource].token;
  }

  cancelSourceInit(cancelSource) {
    this.cancel(cancelSource);
    this.cancelSources[cancelSource] = this.#cancelToken.source();
  }

  cancelSourceClear(cancelSource) {
    delete this.cancelSources[cancelSource];
  }

  cancel(cancelSource, message) {
    if (this.cancelSources[cancelSource]) {
      this.cancelSources[cancelSource].cancel(message);
    }
  }
}

export const http = new HttpService({
  baseURL: process.env.VUE_APP_BASE_URL,
});
