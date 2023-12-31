import { Req, Res } from "@tsed/common";
import {Controller} from "@tsed/di";
import {Get, Options, Post} from "@tsed/schema";
//import fetch from "node-fetch";
import axios from 'axios';
import { Schema, model, Document } from 'mongoose';

@Controller("/sp800-53-rev4")
export class sp800_53_rev4 {
  @Get("/sp800_53_rev4")
  async getSP800_53_rev4() {
    const url = 'https://raw.githubusercontent.com/usnistgov/oscal-content/main/nist.gov/SP800-53/rev4/json/NIST_SP-800-53_rev4_HIGH-baseline-resolved-profile_catalog-min.json';

    try {
      const jsonData = await parseJsonFromURL(url);
      const oscalObjects = createOSCALObjects(jsonData);
      console.log("***** printing oscal objects *****");
      console.log(oscalObjects);
      return oscalObjects;
    } catch (error) {
      console.error('Error', error);
    }
  }

  @Post("/sp800_53_rev4")
  async postSP800_53_rev4(@Req() request: Req, @Res() response: Res): Promise<void> {
    try {
      // Extract data from the request body
      const postData = request.body;

      // Process the data as needed
      // ...
    const url = 'https://raw.githubusercontent.com/usnistgov/oscal-content/main/nist.gov/SP800-53/rev4/json/NIST_SP-800-53_rev4_HIGH-baseline-resolved-profile_catalog-min.json';
    var oscalObjects = "";

    try {
      const jsonData = await parseJsonFromURL(url);
      oscalObjects = createOSCALObjects(jsonData);
      //console.log("***** printing oscal objects *****");
      //console.log(oscalObjects);
      //return oscalObjects;
    } catch (error) {
      console.error('Error', error);
    }

      // Send a response
      response.set({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Content-Length': '0',
      });
      response.status(200).json({ message: "POST request received successfully", data: oscalObjects });
    } catch (error) {
      // Handle errors
      console.error('Error processing POST request:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Options("/sp800_53_rev4")
  async optionsSP800_53_rev4(@Req() request: Req, @Res() response: Res): Promise<void> {
    // Set CORS headers for the OPTIONS request
    response.set({
      'Access-Control-Allow-Origin': 'http://localhost:4200', // or '*', if you want to allow any origin
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Length': '0',
    });
    response.status(204).end();
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

    }catch (error){
        console.error('Error: ${error.message}');
        throw error;
    }
}
function createOSCALObjects(jsonData: any) {
    //console.log(jsonData["catalog"]);

    //There should be at least one catalog
    if(jsonData["catalog"]){
        var uuid = jsonData["catalog"]["uuid"]
        var metadata = jsonData["catalog"]["metadata"]
        console.log(uuid);
        console.log(metadata);
        console.log("meta data objects");
        console.log(uuid);
        //get uuid
        //get metadata
            //get title
            //get version
            //get props??
            //get links
            //get roles
            //get parties
        //get groups
        //handle 'back-matter' -- figure out what this is 
    }

    const keysArray = Object.keys(jsonData);
    return uuid;
}

