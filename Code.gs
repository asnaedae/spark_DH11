function getTemp(access_token, spark_coreID) {
  var access_token = "";

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Temperature");
  var first_temp      = parseAPI("https://api.spark.io/v1/devices/55ff6b065075555350331787/temperature?access_token=" + access_token);
  var ground_temp     = parseAPI("https://api.spark.io/v1/devices/53ff77065075535157231087/temperature?access_token=" + access_token);

  var d = new Date();

  sheet.appendRow([d, ground_temp, first_temp ]);
}

function getHumidity(access_token, spark_coreID) {
  var access_token = "";

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Humidity");
  var first_humidity  = parseAPI("https://api.spark.io/v1/devices/55ff6b065075555350331787/humidity?access_token=" + access_token);
  var ground_humidity = parseAPI("https://api.spark.io/v1/devices/53ff77065075535157231087/humidity?access_token=" + access_token);

  var d = new Date();

  sheet.appendRow([d, ground_humidity, first_humidity ]);
}

function parseAPI(url) {
  var result  = UrlFetchApp.fetch(url);
  var response = JSON.parse(result.getContentText());
  var json = unescape(response.result);
  return JSON.parse(json);
}

function getSparkMetrics() {
  var access_token = "";
  var spark_cores  = [ "55ff6b065075555350331787", "53ff77065075535157231087" ];
  var spark_API    = "https://api.spark.io/v1/devices/";

  var index;
  for	(index = 0; index < spark_cores.length; ++index) {
    Logger.log("Access: " + access_token + " Core: " + spark_cores[index] );
    getHumidity(spark_API + "/" + access_token, spark_cores[index])
  }
}
