/*global require,setInterval,console */
const opcua = require("node-opcua");

// Let's create an instance of OPCUAServer
const server = new opcua.OPCUAServer({
    port: 4334, // the port of the listening socket of the server
    //resourcePath: "UA/MyLittleServer", // this path will be added to the endpoint resource name
     buildInfo : {
        productName: "MySampleServer1",
        buildNumber: "7658",
        buildDate: new Date(2014,5,2)
    }
});

let start = false;
let S1Emitter_Flag = false;
let S2Emitter_Flag = false;

let M1Start = true;
let M2Start = true;
let S1EmitterEmit = false;
let S1EmitterPart = 16;
let S2EmitterEmit = false;
let S2EmitterPart = 16;

let S1OutDiffuseSensor = false;
let S2OutDiffuseSensor = false;

let RigtDiffuseSensor = false;
let LeftDiffuseSensor = false;

let LeftPositionerClamp = false;
let RightPositionerClamp = false;
let RightPositionerRaise = false;

let TAPPX = false;
let TAPPZ = false;
let TAPPG = false;

let BBEmitter_Flag = false;
let BBDiffuseSensor = false;
let BBEmitterEmit= false;
let BBEmitterPart = 8;




function post_initialize() {
    console.log("initialized");
    function construct_my_address_space(server) {
    
        const addressSpace = server.engine.addressSpace;
        const namespace = addressSpace.getOwnNamespace();
        
        // declare a new object
        const device = namespace.addObject({
            organizedBy: addressSpace.rootFolder.objects,
            browseName: "MyDevice"
        });


        /**
         * Factory I/O Start
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "START",
            dataType: "Boolean",
            //minimumSamplingInterval:5000,
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: start});
                },
                set : function(variable){
                    start = variable.value;          
                    //console.log("Setting the Emitter to emit now "+start);
                    if(start){
                        // //console.log("Inside the start ");
                        if(!S1Emitter_Flag){
                            //console.log("Emitter Flag is false -->");
                            setTimeout(()=>{
                                //console.log("Emitting the emitter");
                                S1EmitterEmit = true; 
                             },2000); 
                             setTimeout(()=>{  
                                //console.log("Stopping the emitter");
                                S1EmitterEmit = false;
                                S1Emitter_Flag = true;
                             },2500);


                        }

                        if(!S2Emitter_Flag){
                            //console.log("Emitter Flag is false -->");
                            setTimeout(()=>{
                                //console.log("Emitting the emitter");
                                S2EmitterEmit = true; 
                             },2000); 
                             setTimeout(()=>{  
                                //console.log("Stopping the emitter");
                                S2EmitterEmit = false;
                                S2Emitter_Flag = true;
                             },2500);
                        }
                        // //S1EmitterEmit = true;
                    }
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * Station 1 - CNC Machine 
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "M1Start",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: M1Start});
                },
                set : function(variable){
                    M1Start = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * Station 1 - Emitter(Emit)
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "S1EmitterEmit",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: S1EmitterEmit});
                },
                set : function(variable){ 
                    S1EmitterEmit = variable.value
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * Station 1 - Emitter (Parts).
         * TODO : Randomization of Emitter Parts. 
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "S1EmitterPart",
            dataType: "Double",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double,value:S1EmitterPart});
                },
                set : function(variable){
                    //console.log("Value : "+variable.value);
                    S1EmitterPart = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });


        /**
         * Station 1- Diffuse Sensor.
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "S1OutDiffuseSensor",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: S1OutDiffuseSensor});
                },
                set : function(variable){
                    S1OutDiffuseSensor = variable.value;  
                    if(S1OutDiffuseSensor){
                        S1EmitterEmit = true;
                        setTimeout(()=>{
                            S1EmitterEmit = false;
                        },1000)
                    }                  
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * Station 2 - CNC Machine 
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "M2Start",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: M2Start});
                },
                set : function(variable){
                    M2Start = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * Station 2 - Emitter(Emit)
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "S2EmitterEmit",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: S2EmitterEmit});
                },
                set : function(variable){ 
                    S2EmitterEmit = variable.value
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * Station 2 - Emitter (Parts).
         * TODO : Randomization of Emitter Parts. 
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "S2EmitterPart",
            dataType: "Double",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double,value:S2EmitterPart});
                },
                set : function(variable){
                    //console.log("Value : "+variable.value);
                    S2EmitterPart = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });


        /**
         * Station 2- Diffuse Sensor.
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "S2OutDiffuseSensor",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: S2OutDiffuseSensor});
                },
                set : function(variable){
                    S2OutDiffuseSensor = variable.value;  
                    if(S2OutDiffuseSensor){
                        S2EmitterEmit = true;
                        setTimeout(()=>{
                            S2EmitterEmit = false;
                        },1000)
                    }                  
                    return opcua.StatusCodes.Good;     
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "LeftDiffuseSensor",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: LeftDiffuseSensor});
                },
                set : function(variable){
                    LeftDiffuseSensor = variable.value;  
                    if(LeftDiffuseSensor){
                        /**
                         * After a few seconds-- Make Left Positioner 
                         */
                        setTimeout(()=>{
                            LeftPositionerClamp = true;
                        },1000);
                        setTimeout(()=>{
                            LeftPositionerClamp = false;
                        },2000);

                        setTimeout(()=>{
                            TAPPX = true;
                        },3500)

                        setTimeout(()=>{
                            TAPPZ = true;
                        },4500)

                        setTimeout(()=>{
                            TAPPG = true;                            
                        },5000)

                        setTimeout(()=>{
                            TAPPZ = false;
                        },7000)

                        setTimeout(()=>{
                            TAPPX = false;
                        },8000)
                        
                        setTimeout(()=>{
                            TAPPZ= true;
                        },10000)

                        setTimeout(()=>{
                            TAPPG= false;
                        },10500) 

                        setTimeout(()=>{
                            TAPPZ= false;
                        },12000)

                        setTimeout(()=>{
                            RightPositionerRaise = true;
                        },13000)

                        setTimeout(()=>{
                            RightPositionerRaise = false;
                        },14000)


                    }                  
                    return opcua.StatusCodes.Good;     
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "RigtDiffuseSensor",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: RigtDiffuseSensor});
                },
                set : function(variable){
                    RigtDiffuseSensor = variable.value;  
                    if(RigtDiffuseSensor){
                        /**
                         * After a few seconds-- Make Left Positioner 
                         */
                       setTimeout(()=>{
                           RightPositionerClamp = true;
                       },1000);
                       setTimeout(()=>{
                           RightPositionerClamp = false;
                       },2000);

                    }                  
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "RightPositionerClamp",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: RightPositionerClamp});
                },
                set : function(variable){
                    RightPositionerClamp = variable.value;                 
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "LeftPositionerClamp",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: LeftPositionerClamp});
                },
                set : function(variable){
                    LeftPositionerClamp = variable.value;              
                    return opcua.StatusCodes.Good;     
                }
            }
        });
        
        namespace.addVariable({
            componentOf: device,
            browseName: "TAPPX",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: TAPPX});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "TAPPZ",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: TAPPZ});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "TAPPG",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: TAPPG});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "RightPositionerRaise",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: RightPositionerRaise});
                }
            }
        });
         /**
         * BlackBox - Diffuse Sensor
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "BBDiffuseSensor",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BBDiffuseSensor});
                },
                set : function(variable){
                    BBDiffuseSensor = variable.value;          
                   
                    if(BBDiffuseSensor == true){
                        setTimeout(()=>{
                            //console.log("Emitting the emitter");
                            BBEmitterEmit = true; 
                         },1000); 
                         setTimeout(()=>{  
                            //console.log("Stopping the emitter");
                            BBEmitterEmit = false;
                            //BBEmitter_Flag = true;
                         },1500);
                    }
                    return opcua.StatusCodes.Good;     
                }
            }
        });
          /**
         * BlackBox - Emitter(Emit)
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "BBEmitterEmit",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BBEmitterEmit});
                },
                set : function(variable){ 
                    BBEmitterEmit = variable.value
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * BlackBox - Emitter (Parts).
        
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "BBEmitterPart",
            dataType: "Double",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double,value:BBEmitterPart});
                },
                set : function(variable){
                    //console.log("Value : "+variable.value);
                    BBEmitterPart = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });


    }
        

    construct_my_address_space(server);
    
    
    server.start(function() {
        console.log("Server is now listening ... ( press CTRL+C to stop)");
        console.log("port ", server.endpoints[0].port);
        const endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
        console.log(" the primary server endpoint url is ", endpointUrl );
    });
}
server.initialize(post_initialize);