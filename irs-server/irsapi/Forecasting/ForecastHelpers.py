import pandas as pd
import numpy as np
import string
import time
from fbprophet import Prophet

def aggregate_minute_to_daily(data):
    sales_data = data.groupby(['InvoiceDate'])['Quantity'].sum()
    sales_data = sales_data.groupby(pd.Grouper(freq='D')).sum()
    sales_data = pd.DataFrame({"ds": sales_data.index, "y":sales_data.values})
    return sales_data

def aggregate_daily_to_monthly(data):
    sales_data = data.groupby(['InvoiceDate'])['Quantity'].sum()
    sales_data = sales_data.groupby(pd.Grouper(freq='M')).sum()
    sales_data = pd.DataFrame({"ds": sales_data.index, "y":sales_data.values})
    return sales_data

def make_item_forecast(items_data, item, frequency, period):
    nodeToForecast = pd.DataFrame()
    nodeToForecast['y'] = items_data[item]
    nodeToForecast = pd.concat([items_data.iloc[:,0], nodeToForecast], axis = 1)
    # rename for prophet compatability

    nodeToForecast = nodeToForecast.rename(columns = { nodeToForecast.columns[0]: "ds" } )
    growth = 'linear'
    m = Prophet(growth, daily_seasonality=True)
    m.fit(nodeToForecast)
    future = m.make_future_dataframe(periods = period, freq = frequency)
    future['floor'] = -10
    item_forecasts = m.predict(future)
    item_forecasts['yhat'] = item_forecasts['yhat'].clip(lower=0)
    return item_forecasts

def make_all_items_forecast(items_data):

    start_time=time.time()
    forecastsDict = {}
    for node in range(0, len(items_data)):
        # take the date-column and the col to be forecasted
        item = items_data.columns[node+1]

        forecastsDict[node] = make_item_forecast(items_data, item, 'D', 182)
        if (node== 5):
            end_time=time.time()
            print("forecasting for ",node,"th node and took",end_time-start_time,"s")
            break
