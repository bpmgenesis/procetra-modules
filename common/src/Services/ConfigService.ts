import {is} from '@tuval/core';

export class ConfigService {
    public static GetEbaBrokerUrl(): string {
        return 'https://bpmgenesis.com/broker/eba';
    }
    public static GetEnsembleUrl(): string {
        return 'https://bpmgenesis.com/broker/ensemble';
    }
    public static GetSymbolBrokerUrl(): string {
        //return 'http://apidera.com/symbol';
       return 'https://bpmgenesis.com/broker/symbol';
    }
    public static GetMiningBrokerUrl(): string {
         let url = '';
        debugger;
        if (is.localhost()) {
            url = 'http://localhost:5001/v1/';
        } else {
            url ='https://api.apirealm.com/mining/';
        }
       /*  const url = window.location.origin + '/broker/mining/v1/';
        console.log(url); */

        return url;
    }
}