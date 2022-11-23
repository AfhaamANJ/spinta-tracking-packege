const handler = {
    get: function (target, prop) {
      return target.hasOwnProperty(prop)
        ? target[prop]
        : (...args) => {
            window.tap(prop, ...args);
          };
    }
  };


const target = {
    init: (
      accountId,
      createOptions = { integration: "npm-module" },
      createCallback,
      detectOptions = {},
      detectCallback
    ) => {
      if (window.tap) return;
  
      (function(t,a,p){
        // console.log(t,a,p,arguments);
        t.trackerObject=a;
        t[a]=t[a]||function()
        { (t[a].q=t[a].q||[]).push(arguments)}
       }
      )(window,'tap');

  
      var script = document.createElement("script");
      script.src = "https://dev-amp-scripts.anjtechsolutions.com/main.js";
      script.type = "text/javascript";
      script.async = true;
  
      document.getElementsByTagName("head")[0].appendChild(script);
      script.addEventListener("error", () => {
        new Error(`${this.src} failed to load.`);
      });
  
      window.tap("create", accountId, createOptions, createCallback);
      window.tap("detect", detectOptions, detectCallback);
    }
  };
  var Tap = new Proxy(target, handler);

  export default Tap
