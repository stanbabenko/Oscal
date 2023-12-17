import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";

@Controller("/sp800-53-rev4")
export class sp800_53_rev4 {
  @Get("/sp800_53_rev4")
  getSP800_53_rev4(){
    return "getting and parsing sp800_53_rev4 in json";
  }
}
