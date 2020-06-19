import pandas as pd
import numpy as np
import string
from fbprophet import Prophet
from . import DataSpecificHelpers as dh
from . import ForecastHelpers as fh



# PREPROCESSING

def clean():
    original_data = pd.read_csv('./irsapi/Forecasting/onlineretail.csv', encoding='latin1')
    cleaned_data = dh.clean_data(original_data)
    #cleaned_data = remove_outliers(cleaned_data, 0, 1000)
    cleaned_data = fh.aggregate_minute_to_daily(cleaned_data)
    cleaned_data.to_csv('./irsapi/Forecasting/data.csv')

#clean()
data = pd.read_csv('./irsapi/Forecasting/data.csv')

# TRAIN MODEL AND FORECAST

##### SALES FORECAST #####

def forecast_monthly_sales(days=182):

    model = Prophet(daily_seasonality=True) 
    model.fit(data)

    future = model.make_future_dataframe(periods = days, freq = 'D')  
    forecast = model.predict(future)

    forecastset = pd.DataFrame({"InvoiceDate":forecast['ds'], "Quantity":forecast['yhat']})

    forecastset = fh.aggregate_daily_to_monthly(forecastset)

    return forecastset.to_json()


##### ITEMS SALES FORECAST #####

def forecast_monthly_item_sales(item, days):

    item_sales = dh.aggregate_on_items(cleaned_data)
    print(item_sales.head())
    item_forecast = fh.make_item_forecast(item_sales, item, 'D', days)

    item_forecast_monthly = pd.DataFrame({"InvoiceDate":item_forecast['ds'], "Quantity":item_forecast['yhat']})
    item_forecast_monthly = fh.aggregate_daily_to_monthly(item_forecast_monthly)

    return item_forecast_monthly.to_json()

#print(forecast_monthly_item_sales('101233', 365))
