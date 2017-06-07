var HttpDownloader = (function () {
    function HttpDownloader(_$http, _$q) {
        this._$http = _$http;
        this._$q = _$q;
    }
    HttpDownloader.prototype.download = function (modifiedHttpObject) {
        var _this = this;
        if (!modifiedHttpObject)
            throw new Error('Please pass your parameters in to the htttpDownloader');
        if (!modifiedHttpObject.responseType)
            modifiedHttpObject.responseType = 'arraybuffer';
        return new this._$q(function (resolve, reject) {
            _this._$http(modifiedHttpObject).then(function (res) {
                var data = res.data;
                var blob = new Blob([data], {
                    type: modifiedHttpObject.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                var fileName = modifiedHttpObject.fileName || 'untitled';
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
                return resolve();
            }).catch(reject);
        });
    };
    return HttpDownloader;
}());
HttpDownloader.$inject = ['$http', '$q'];
angular.module('httpDownloader', [])
    .service('_httpDownloader', HttpDownloader)
    .service('httpDownloader', function (_httpDownloader) {
    return _httpDownloader.download;
});
//# sourceMappingURL=http-downloader.module.js.map