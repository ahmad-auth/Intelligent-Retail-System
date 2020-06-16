import pandas as pd
import numpy as np
import string
def clean_data(data):
    # Find the stock codes that include alphabet in them
    print("BEFORE CLEAN",data['StockCode'].count())
    char_rows = data[data['StockCode'].str.contains('[A-Za-z]')].copy()

    # Map the alphabets in stock code to a number 
    dict_map = dict(zip(string.ascii_uppercase, range(1,27)))
    dict_map.update(dict(zip(string.ascii_lowercase, range(28, 54))))
    for k,v in dict_map.items():
        char_rows['StockCode'] = char_rows['StockCode'].str.replace(k, str(v))


    # Merge the alphabet stock code data with whole dataset
    char_rows['InvoiceDate'] =  pd.to_datetime(char_rows['InvoiceDate'])
    char_rows.set_index('InvoiceDate')

    data['InvoiceDate'] =  pd.to_datetime(data['InvoiceDate'])
    data = data.set_index('InvoiceDate')

    filter = data['StockCode'].str.contains('[A-Za-z]')
    data = data[~filter]
    data = data.append(char_rows)

    print("AFTER CLEAN",data['StockCode'].count())

    return data

def remove_outliers(data, lower_limit, higher_limit):
    outliers_to_remove = (data['Quantity'] >= lower_limit) | (data['Quantity'] <= higher_limit)
    data = data[~outliers_to_remove]
    print("AFTER OUTLIERS",data.head())
    return data

def aggregate_on_items(data):
    print("BEFORE AGGREGATE",len(data['StockCode'].unique()))
    daily_sales= data.groupby(["StockCode","InvoiceDate"])["Quantity"].sum()
    # arrange it conviniently to perform the hts 
    daily_sales=daily_sales.unstack(level=-1).fillna(0)
    daily_sales=daily_sales.T
    daily_sales= daily_sales.groupby(pd.Grouper(freq="D")).sum()
    daily_sales=daily_sales.reset_index()
    print("AFTER AGGREGATE",len(daily_sales))
    return daily_sales