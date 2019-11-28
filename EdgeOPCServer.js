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
let S1_START = true;
let CM_START_TS = new Date();
let PRG_ID = 0000000;

let S1beltConveyor2=true;
let S1beltConveyorRejection=true;
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
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /**
         * Factory I/O Start from SAP
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "Station1",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: S1_START});
                },
                set : function(variable){
                    S1_START = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

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




        function CM_START_TS1(){
            if(start){
                CM_START_TS = new Date();
                return CM_START_TS;
            } else {
                return null;
            }
        }

        /**
         * Factory I/O Start Timestamp
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "CM_START_TS",
            dataType: "DateTime",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.DateTime,value: CM_START_TS1()});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "PRG_ID",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: PRG_ID});
                },
                set : function(variable){
                    PRG_ID = variable.value;                    
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