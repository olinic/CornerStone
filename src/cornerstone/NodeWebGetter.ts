// Interfaces
import ILogger from "../interfaces/ILogger";
import IUrlOptions from "../interfaces/IUrlOptions";
import IWebGetter from "../interfaces/IWebGetter";

// External
import { Promise } from "es6-promise";
import { request as httpRequest} from "http";
import { request as httpsRequest } from "https";
import { parse } from "url";

export default class NodeWebGetter implements IWebGetter
{
   public constructor(
         private logger: ILogger,
         private readonly PROMISE_TIMEOUT_PERIOD: number = 3000 /* milliseconds */)
   {}

   public request(options: IUrlOptions): Promise<any>
   {
      const url = options.url;
      let method = options.method;
      // Default is to do nothing
      let preResolve = (response) => response;

      if (method === "JSONP") {
         method = "GET";
         preResolve = (response) => {
            let start = response.indexOf("({");
            start = (start !== -1) ? start : 0;

            let end = response.lastIndexOf("})");
            end = (end !== -1) ? end : response.length;

            // Return the JSON without the parentheses.
            const json = response.substring(start + 1, end + 1);
            return json;
         };
      }

      // return a promise
      return new Promise((
         resolve: (response: string) => void,
         reject: (err: Error) => void) => {

         const options = {
            hostname: parse(url).hostname,
            method,
            path: (parse(url).pathname || "") + (parse(url).search || ""),
            port: Number(parse(url).port) || 80,
            protocol: parse(url).protocol || "http:",
            headers: {
               "User-Agent": "javascript"
            }
         };
         this.logger.debug("Sending URL options: " + JSON.stringify(options));

         const webRequest: any = (options.protocol.toLowerCase().indexOf("https") === -1)
                                    ? httpRequest : httpsRequest;

         const req = webRequest(options, (res) => {
            const { statusCode, statusMessage } = res;

            // reject on error
            if (statusCode < 200 || statusCode >= 300) {
               reject(this.logger.logAndGiveError("Bad Status", statusCode, statusMessage, "in URL", url));
            }

            let data = "";

            res.on("data", (chunk) => {
               data += chunk;
            });

            res.on("end", () => {
               // handle JSONP if necessary
               data = preResolve(data);
               resolve(data);
            });

         });

         req.on("error", (e) => {
            reject(this.logger.logAndGiveError("Experienced error with URL request.", e.message, "in URL", url));
         });
         req.end();
      });
   }
}
