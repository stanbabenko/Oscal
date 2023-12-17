import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
//import fetch from "node-fetch";
import axios from 'axios';

@Controller("/sp800-53-rev4")
export class sp800_53_rev4 {
  @Get("/sp800_53_rev4")
  getSP800_53_rev4(){

    const url = 'https://raw.githubusercontent.com/usnistgov/oscal-content/main/nist.gov/SP800-53/rev4/json/NIST_SP-800-53_rev4_HIGH-baseline-resolved-profile_catalog-min.json';

    parseJsonFromURL(url)
        .then((jsonData) => {
            console.log('Parsed JSON data:', jsonData);
    }).catch((error) => {
        console.error('Error', error);
    });

    return "getting and parsing sp800_53_rev4 in json";
  }
}

async function parseJsonFromURL(url: string): Promise<any> {
    try {
        console.log("Fetching from " + url);

        const response = await axios.get(url);

        if (response.status !== 200){
            throw new Error('Failed to fetch data');
        }

        const jsonData = response.data;

        return jsonData;

        console.log("Done Fetching from " + url);
    }catch (error){
        console.error('Error: ${error.message}');
        throw error;
    }
}
