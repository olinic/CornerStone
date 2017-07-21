// src file
const myCache = require("../../" + generatedJsPath + "cornerstone/Cache.js");

describe("Cache", () => {
   let cache = myCache.getInstance();

   beforeEach(() => {
      // clear cache
      cache.clear();
   });

   function randomString(length)
   {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/:"
      for (let i = 0; i < length; i++) {
         text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
   }

   // Test storage
   let keyTypes = ["string", "number"]
   keyTypes.forEach((keyType) => {
      // counter used for number keys
      let counter = Math.random()*100;

      let promiseValue = "hot dogs";
      let dataItems = [
         "teststring",
         25,
         { "name": "car" },
         [0, 1],
         new Promise((resolve, reject) => {
            resolve(promiseValue);
         })
      ];
      // iterate through each data item
      dataItems.forEach((dataItem) => {
         let dataType;
         if (dataItem instanceof Array) {
            dataType = "Array";
         } else if (dataItem instanceof Promise) {
            dataType = "Promise";
         } else {
            dataType = typeof dataItem;
         }

         it("should cache a <" + dataType + "> with key <" + keyType + ">", () => {
            let key = (keyType === "string") ? randomString(25) : counter++;
            cache.store(key, dataItem);
            cache.retrieve(key).then((data) => {
               if (dataItem instanceof Promise) {
                  expect(data).toEqual(promiseValue);
               } else {
                  expect(data).toEqual(dataItem);
               }
            }).catch((err) => {
               fail(err);
            });
         });
      });
   });

   it("should replace a data item that has the same key", () => {
      let key = 1;
      let first = "bacon";
      let second = "cheese";
      cache.store(key, first);
      cache.store(key, second);
      cache.retrieve(key).then((data) => {
         expect(data).toEqual(second);
      }).catch((err) => {
         fail(err);
      });
   });

   it("should return the same instance (singleton)", () => {
      let secondCache = myCache.getInstance();
      expect(cache).toBe(secondCache);
   });

   it("should check for existing item", () => {
      let key = "www.found.com";
      cache.store(key, 1);
      expect(cache.checkFor(key)).toBeTruthy();
   });

   it("should check for non-existing item", () => {
      expect(cache.checkFor("www.notfound.com")).toBeFalsy();
   });

   it("should throw error for retrieving non-existing item", () => {
      // requires anonymous function to work
      expect(() => {
         cache.retrieve("irretrievable");
      }).toThrowError(/does not exist/);
   });

   it("should clear the cache", () => {
      let key = "hello";
      let value = "world";

      // This assumes that store and checkFor work properly.
      cache.store(key, value);
      cache.clear();
      expect(cache.checkFor(key)).toBeFalsy();
   });
});
