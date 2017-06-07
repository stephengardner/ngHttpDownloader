class HttpDownloader {
  static $inject = ['$http', '$q'];
  constructor(private _$http, private _$q) {}
  download(modifiedHttpObject) {
    if(!modifiedHttpObject) throw new Error('Please pass your parameters in to the htttpDownloader');
    if(!modifiedHttpObject.responseType) modifiedHttpObject.responseType = 'arraybuffer';
    return new this._$q((resolve, reject) => {
      this._$http(modifiedHttpObject).then(res => {
        let data = res.data;
        let blob = new Blob([data], {
          type: modifiedHttpObject.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        let fileName = modifiedHttpObject.fileName || 'untitled';
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
        return resolve();
      }).catch(reject);
    });
  }
}
angular.module('httpDownloader', [])
  .service('_httpDownloader', HttpDownloader)
  .service('httpDownloader', function(_httpDownloader) {
    return _httpDownloader.download;
});