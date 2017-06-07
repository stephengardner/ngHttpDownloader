# Ng Http Downloader
### A simple AngularJS Service to Download files returned by an $http call.

---
#### download
`npm i ng-http-downloader`
#### params:
The same parameters as AngualrJS's $http, with two added parameters.

- `fileName` - required.  The name of the file you want to download.  Example: `"Email List.xlsx"`
- `type` - defaults to `"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"` (an excel spreadsheet).

---
#### usage:
```
httpDownloader({
  method : 'POST',
  url : '--- enter the url that returns a file here ---',
  data : ifYouHaveDataEnterItHere,
  type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // this is the default
  fileName : 'EnterFileNameHere.xlsx'
}).then(res => {}).catch(e => {});
```