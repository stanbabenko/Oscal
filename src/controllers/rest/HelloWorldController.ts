import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";

@Controller("/")
export class RootController {
  @Get("/")
  getRoot(){
    return "top level";
  }
}

@Controller("/hello-world")
export class HelloWorldController {
  @Get("/")
  get() {
    return "hello";
  }
}
