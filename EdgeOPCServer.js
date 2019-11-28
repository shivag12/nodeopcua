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
let S1beltConveyor1 = true;

let S1beltConveyor2=true;
let S1beltConveyorRejection=true;
let M1Start = true;
let S1EmitterEmit = false;
let S1EmitterPart = 16;

let S1outbeltConveyor=true;
let S1outbeltConveyor1=true;
let CurvedbeltConveyorCW =true;

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
                            console.log("Emitter Flag is false -->");
                            setTimeout(()=>{
                                console.log("Emitting the emitter");
                                S1EmitterEmit = true; 
                             },2000); 
                             setTimeout(()=>{  
                                console.log("Stopping the emitter");
                                S1EmitterEmit = false;
                                S1Emitter_Flag = true;
                             },3000);
                        }
                        // //S1EmitterEmit = true;
                    }
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * Station 1 - Belt Conveyor 1
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "S1beltConveyor1",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: S1beltConveyor1});
                },
                set : function(variable){
                    S1beltConveyor1 = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * Station 1 - Belt Conveyor 2
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "S1beltConveyor2",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: S1beltConveyor2});
                },
                set : function(variable){
                    S1beltConveyor2 = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * Station 1 - Belt Conveyor Rejection 
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "S1beltConveyorRejection",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: S1beltConveyorRejection});
                },
                set : function(variable){
                    S1beltConveyorRejection = variable.value;                    
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
         * Station 1 - Emitter (Parts)
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