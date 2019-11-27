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
let CM_START = false;
let CM_START_TS = new Date();
let PRG_ID = 0000000;
let ORDER_ID = 0000000;
let SFC_ID = 0000000;
let pick = false;
let BConveyor1 = true;
let BConveyor2 = true;
let BConveyor3 = true;
let BConveyor4 = true;

let BConveyor5 = true;
let BConveyor6 = true;
let BConveyor7 = true;
let BConveyor8 = true;
let BConveyor9 = true;
let BConveyor9a = true;

let BConveyor10 = true;
let BConveyor11 = true;
let BConveyor12 = true;
let BConveyor13 = true;

let BConveyor14 = true;
let BConveyor15 = true;
let BConveyor16 = true;
let BConveyor17 = true;
let BConveyor18 = true;
let BConveyor19 = true;
let BConveyor20 = true;

let CBConveyor1 = true;
let CBConveyor2 = true;

let CBConveyor3 = true;
let CBConveyor4 = true;

let TAPP3X = false;
let TAPP3Z = false;
let TAPP3G = false;
let TAPP3CW = false;

let VisionSensor; 
let TPPNoTurns = false;

let E1 = true;
let RetroReflectiveSensor1 = true;
let RetroReflectiveSensor2 = true;
let Robot1 = true;
let DffSensor3 = false;
let StopBlade1 = false;
let RetroReflectiveSensor4 = true;
let DffSensor1 = false;
let DffSensor2 = false;
let DffSensor3a = false;
let DffSensor4 = false;
let DffSensor5 = false;
let DffSensor6 = false;

let LPClamped = false;
let RPClamped = false;
let RPRaised = false;
let TAPP1X = false;
let TAPP1Z = false;
let TAPP1G = false;

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
            browseName: "CM_START",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: CM_START});
                },
                set : function(variable){
                    CM_START = variable.value;                    
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

        namespace.addVariable({
            componentOf: device,
            browseName: "ORDER_ID",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: ORDER_ID});
                },
                set : function(variable){
                    ORDER_ID = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "SFC_ID",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: SFC_ID});
                },
                set : function(variable){
                    SFC_ID = variable.value;                    
                    return opcua.StatusCodes.Good;     
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

        let ST1_START = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST1_START",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: ST1_START});
                },
                set : function(variable){
                    ST1_START = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });


        let ST1_START_TS ;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST1_START_TS",
            dataType: "DateTime",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.DateTime,value: ST1_START_TS});
                },
                set : function(variable){
                    ST1_START_TS = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST1_STOP_TS ;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST1_STOP_TS",
            dataType: "DateTime",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.DateTime,value: ST1_STOP_TS});
                },
                set : function(variable){
                    ST1_STOP_TS = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST1_PRD_COUNT = 0;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST1_PRD_COUNT",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: ST1_PRD_COUNT});
                },
                set : function(variable){
                    ST1_PRD_COUNT = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST1_REJ_COUNT = 0;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST1_REJ_COUNT",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: ST1_REJ_COUNT});
                },
                set : function(variable){
                    ST1_REJ_COUNT = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST1_COMPLETION = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST1_COMPLETION",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: ST1_COMPLETION});
                },
                set : function(variable){
                    ST1_COMPLETION = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        /*****************************************************************************************************/
                        /** STATION 2 :- ASSEMBLY STATION */
        /*****************************************************************************************************/


        let ST2_START = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST2_START",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: ST2_START});
                },
                set : function(variable){
                    ST2_START = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });


        let ST2_START_TS ;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST2_START_TS",
            dataType: "DateTime",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.DateTime,value: ST2_START_TS});
                },
                set : function(variable){
                    ST2_START_TS = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST2_STOP_TS ;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST2_STOP_TS",
            dataType: "DateTime",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.DateTime,value: ST2_STOP_TS});
                },
                set : function(variable){
                    ST2_STOP_TS = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST2_PRD_COUNT = 000000;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST2_PRD_COUNT",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: ST2_PRD_COUNT});
                },
                set : function(variable){
                    ST2_PRD_COUNT = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST2_REJ_COUNT = 000000;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST2_REJ_COUNT",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: ST2_REJ_COUNT});
                },
                set : function(variable){
                    ST2_REJ_COUNT = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST2_COMPLETION = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST2_COMPLETION",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: ST2_COMPLETION});
                },
                set : function(variable){
                    ST2_COMPLETION = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });   

        /*****************************************************************************************************/
                                /** STATION 3 :- Quality Inspection Tags */
        /*****************************************************************************************************/

        
        let ST3_START = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST3_START",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: ST3_START});
                },
                set : function(variable){
                    ST3_START = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });


        let ST3_START_TS ;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST3_START_TS",
            dataType: "DateTime",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.DateTime,value: ST3_START_TS});
                },
                set : function(variable){
                    ST3_START_TS = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST3_STOP_TS ;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST3_STOP_TS",
            dataType: "DateTime",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.DateTime,value: ST3_STOP_TS});
                },
                set : function(variable){
                    ST3_STOP_TS = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST3_PRD_COUNT = 000000;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST3_PRD_COUNT",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: ST3_PRD_COUNT});
                },
                set : function(variable){
                    ST3_PRD_COUNT = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST3_REJ_COUNT = 000000;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST3_REJ_COUNT",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: ST3_REJ_COUNT});
                },
                set : function(variable){
                    ST3_REJ_COUNT = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST3_COMPLETION = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST3_COMPLETION",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: ST3_COMPLETION});
                },
                set : function(variable){
                    ST3_COMPLETION = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        }); 
        
        let ST3_QA_STATUS_IND = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST3_QA_STATUS_IND",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: ST3_QA_STATUS_IND});
                },
                set : function(variable){
                    ST3_QA_STATUS_IND = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });  

        /*****************************************************************************************************/
                        /** STATION 4 : AGGREGRATION */
        /*****************************************************************************************************/
        
        let ST4_START = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST4_START",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: ST4_START});
                },
                set : function(variable){
                    ST4_START = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });


        let ST4_START_TS ;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST4_START_TS",
            dataType: "DateTime",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.DateTime,value: ST4_START_TS});
                },
                set : function(variable){
                    ST4_START_TS = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST4_STOP_TS ;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST4_STOP_TS",
            dataType: "DateTime",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.DateTime,value: ST4_STOP_TS});
                },
                set : function(variable){
                    ST4_STOP_TS = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST4_PRD_COUNT = 000000;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST4_PRD_COUNT",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: ST4_PRD_COUNT});
                },
                set : function(variable){
                    ST4_PRD_COUNT = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST4_REJ_COUNT = 000000;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST4_REJ_COUNT",
            dataType: "Int64",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Int64,value: ST4_REJ_COUNT});
                },
                set : function(variable){
                    ST4_REJ_COUNT = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        let ST4_COMPLETION = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "ST4_COMPLETION",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: ST4_COMPLETION});
                },
                set : function(variable){
                    ST4_COMPLETION = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        }); 
        
        /*****************************************************************************************************/
       
       
        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor1",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor1});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor5",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor5});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor6",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor6});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor7",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor7});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor8",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor8});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor9",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor9});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor10",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor10});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor11",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor11});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor12",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor12});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor13",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor13});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor14",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor14});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor15",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor15});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor16",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor16});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor17",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor17});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor18",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor18});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor19",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor19});
                }
            }
        });
        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor9a",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor9a});
                }
            }
        });
        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor20",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor20});
                }
            }
        });


        let RFlag2 = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "DffSensor3a",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: DffSensor3a});
                },set: (variant)=>{
                    DffSensor3a = variant.value;
                    if(DffSensor3a){
                        //console.log("Second Station production Count : "+ST2_PRD_COUNT);
                        if(!RFlag2){
                            ST2_STOP_TS = new Date();
                            ST2_START = false;
                            ST2_COMPLETION = true;
                            ST2_PRD_COUNT = ST2_PRD_COUNT + 1;
                            RFlag2 = true;
                            setTimeout(()=>{
                                ST3_COMPLETION = false;
                                ST3_START = true;
                                ST3_START_TS = new Date();
                            },2000);
                        }
                    } else {
                        RFlag2 = false;
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });

        let RFlag3 = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "DffSensor4",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: DffSensor4});
                },set: (variant)=>{
                    DffSensor4 = variant.value;
                    if(DffSensor4){
                        if(!RFlag3){
                            ST3_STOP_TS = new Date();
                            ST3_START = false;
                            ST3_COMPLETION = true;
                            ST3_PRD_COUNT = ST3_PRD_COUNT + 1;
                            RFlag3 = true;
                        }
                    } else {
                        RFlag3 = false;
                    }

                    return opcua.StatusCodes.Good;
                }
            }
        });


        let RFlag4 = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "DffSensor5",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: DffSensor5});
                },set: (variant)=>{
                    DffSensor5 = variant.value;
                    if(DffSensor5){
                        if (!RFlag4) {
                            ST4_STOP_TS = new Date();
                            ST4_START = false;
                            ST4_COMPLETION = true;
                            ST4_REJ_COUNT = ST4_REJ_COUNT + 1;
                            RFlag4 = true;
                        }
                    } else {
                        RFlag4 = false;
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });


        let RFlag5 = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "DffSensor6",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: DffSensor6});
                },set: (variant)=>{
                    DffSensor6 = variant.value;
                    if(DffSensor6){
                        if (!RFlag5) {
                            ST4_STOP_TS = new Date();
                            ST4_START = false;
                            ST4_COMPLETION = true;
                            ST4_PRD_COUNT = ST4_PRD_COUNT + 1;
                            RFlag5 = true;
                        }
                    } else {
                        RFlag5 = false;
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });


        
        namespace.addVariable({
            componentOf: device,
            browseName: "CBConveyor1",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: CBConveyor1});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "CBConveyor2",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: CBConveyor2});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "CBConveyor3",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: CBConveyor3});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "CBConveyor4",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: CBConveyor4});
                }
            }
        });



        namespace.addVariable({
            componentOf: device,
            browseName: "Robot1",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: Robot1});
                }
            }
        });

        function RReflective(){
            // console.log(`RetroReflectiveSensor : ${RetroReflectiveSensor1}`);
            // if(!RetroReflectiveSensor1){
            //     console.log(`Stopping BConveyour1...!`);
            //     BConveyor1 = false;
            // }
            return RetroReflectiveSensor1;
        }

        namespace.addVariable({
            componentOf: device,
            browseName: "RetroReflectiveSensor1",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: RReflective()});
                },
                set: function (variant) {
                    //console.log(`RetroReflectiveSensor at set : ${RetroReflectiveSensor1}`);
                    RetroReflectiveSensor1 = variant.value;
                    if (!RetroReflectiveSensor1) {
                        //console.log(`Stopping BConveyour1...!`);
                        BConveyor1 = false;
                        ST1_COMPLETION = false;
                        ST1_START = true;
                        ST1_START_TS = new Date();
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });

        function RReflective2(){
            // if(!RetroReflectiveSensor2){
            //     console.log(`Starting BConveyour1...!`);
            //     BConveyor1 = true;
            // }
            return RetroReflectiveSensor2;
        }

        let RFlag = false;

        namespace.addVariable({
            componentOf: device,
            browseName: "RetroReflectiveSensor2",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: RReflective2()});
                },
                set: function (variant) {
                    RetroReflectiveSensor2 = variant.value;
                    if (!RetroReflectiveSensor2) {
                        //console.log(`Increasing the Production Count : ${ST1_PRD_COUNT}`);
                        if (!RFlag) {
                            ST1_STOP_TS = new Date();
                            ST1_START = false;
                            ST1_COMPLETION = true;
                            ST1_PRD_COUNT = ST1_PRD_COUNT + 1;
                            RFlag = true;
                        }
                    } else {
                        RFlag = false;
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });


        /**
         * DEPRECIATED
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "DffSensor3",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: DffSensor3});
                },
                set: function (variant) {
                    //console.log(`RetroReflectiveSensor at set : ${RetroReflectiveSensor1}`);
                    DffSensor3 = variant.value;

                    if (DffSensor3) {

                        ST4_COMPLETION = false;
                        ST4_START = true;
                        ST4_START_TS = new Date();
                       
                        setTimeout(()=>{
                            TAPP3CW = true;
                        },2000);

                        setTimeout(()=>{
                            TAPP3X = true;
                        },3000);

                        setTimeout(()=>{
                            TAPP3Z = true;
                            TAPP3G = true;
                            //pick = true;
                        },4000);
                        
                        setTimeout(()=>{
                            TAPP3Z = false;
                            //pick = false;
                        },5500);
                            
                        setTimeout(()=>{
                            TAPP3CW = false;
                            //pick = false;
                        },6000);

                        setTimeout(()=>{
                            TAPP3CW = true;
                            //pick = false;
                        },7000);

                        setTimeout(()=>{
                            TAPP3CW = false;
                            //pick = false;
                        },7500);

                        setTimeout(()=>{
                            TAPP3CW = true;
                            //pick = false;
                        },8500);

                        setTimeout(()=>{
                            TAPP3CW = false;
                            //pick = false;
                        },9000);

                        if(TPPNoTurns){    
                            setTimeout(()=>{
                                TAPP3CW = true;
                                //pick = false;
                            },10000);
    
                            setTimeout(()=>{
                                TAPP3CW = false;
                                //pick = false;
                            },10500);

    
                            setTimeout(()=>{
                                TAPP3Z = true;
                                //TAPP3G = false;
                                //pick = false;
                            },11000);
    
                            setTimeout(()=>{
                                //TAPP3Z = true;
                                TAPP3G = false;
                                //pick = false;
                            },11500);
    
                            setTimeout(()=>{
                                TAPP3Z = false;
                                TAPP3X = false;
                                TPPNoTurns = false;
                                //TAPP3CW = false;
                                //pick = false;
                            },12000);

                             

                        } else {

                            console.log(`No Rejection`)
    
                            setTimeout(()=>{
                                TAPP3Z = true;
                            },10000);
    
                            setTimeout(()=>{
                                //TAPP3Z = true;
                                TAPP3G = false;
                                //pick = false;
                            },10500);
    
                            setTimeout(()=>{
                                TAPP3Z = false;
                                TAPP3X = false;
                                TAPP3CW = false;
                                //pick = false;
                            },11000);

                            setTimeout(()=>{
                                //TAPP3Z = true;
                                //TAPP3G = true;
                                //pick = false;
                                TAPP3CW = true;
                            },11500);

                            setTimeout(()=>{
                                TAPP3CW = false;
                                //TAPP3Z = true;
                                //TAPP3G = false;
                                //pick = false;
                            },12000);
                        }
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });


        /**
         * DEPRECIATED
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "RetroReflectiveSensor4",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: true});
                },
                set: function (variant) {
                    //console.log(`RetroReflectiveSensor at set : ${RetroReflectiveSensor1}`);
                    RetroReflectiveSensor4 = variant.value;
                    if (!RetroReflectiveSensor4) {
                        //console.log(`Stopping the BConveyor4...`);                        
                        setTimeout(()=>{
                            BConveyor4 = false;
                        },25)
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });

        /**
         * Diffuse Sensor - 1 at Robotic ARM 1
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "DffSensor1",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: DffSensor1});
                },
                set: function (variant) {
                    //console.log(`RetroReflectiveSensor at set : ${RetroReflectiveSensor1}`);
                    DffSensor1 = variant.value;
                    //console.log(`Diffuse Sensor State : ${DffSensor1}`);
                    if (DffSensor1) {
                        //console.log(`Stopping the BConveyor4...`);                          
                        setTimeout(()=>{
                            //console.log(`Diffuse Sensor True : Stopping the Conveyor 4`);
                            BConveyor4 = false;
                            LPClamped = true;
                        },1000)

                        
                        setTimeout(()=>{
                            LPClamped = false;
                        },2000)
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });

        /**
         * Left Positioner alignment
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "LPClamped",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: LPClamped});
                },
                set: function (variant) {
                    //console.log(`Setting the LPClamped to True`);
                    LPClamped = variant.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        /**
         * Right Positioner alignment
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "RPClamped",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: RPClamped});
                }
            }
        });

        /**
         * Right Positioner - Raise
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "RPRaise",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: RPRaised});
                }
            }
        });


        /**
         * Diffuse Sensor 2
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "DffSensor2",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: DffSensor2});
                },set:(variant)=>{

                    DffSensor2 = variant.value;

                    if(DffSensor2){  
                        
                        ST2_COMPLETION = false;
                        ST2_START = true;
                        ST2_START_TS = new Date();
                        
                        setTimeout(()=>{
                            RPClamped = true;
                        },1000)

                        setTimeout(()=>{
                            RPClamped = false;
                        },2000)

                        setTimeout(()=>{
                            TAPP1Z = true;
                            TAPP1G = true;
                        },3000)
    
                        setTimeout(()=>{
                            TAPP1Z = false;
                        },4500)
    
                        setTimeout(()=>{
                            TAPP1X = true;
                        },5900)

                        setTimeout(()=>{
                            TAPP1Z = true;
                        },6900)

                        setTimeout(()=>{
                            TAPP1G = false;                            
                        },7900)

                        setTimeout(()=>{
                            TAPP1Z = false;
                            //TAPP1Z = true;
                        },8900)

                        setTimeout(()=>{
                            TAPP1X = false;
                            //TAPP1Z = true;
                        },9900)

                        setTimeout(()=>{
                            RPRaised = true;
                            BConveyor1 = true;
                            BConveyor4 = true;
                        },11000)

                        setTimeout(()=>{
                            RPRaised = false;
                        },13000)

                    }
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "TAPP1X",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: TAPP1X});
                }
            }
        });
        


        namespace.addVariable({
            componentOf: device,
            browseName: "TAPP1Z",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: TAPP1Z});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "TAPP1G",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: TAPP1G});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "TAPP3X",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: TAPP3X});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "TAPP3Z",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: TAPP3Z});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "TAPP3G",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: TAPP3G});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "TAPP3CW",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: TAPP3CW});
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "VisionSensor",
            dataType: "Double",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double,value: VisionSensor});
                },set: (variant)=>{
                    //console.log(`Vision Sensor Value : ${variant.value}`);
                    VisionSensor = variant.value;
                    if(VisionSensor === 8){
                        console.log(`Metal Lid detected --> Put it in rejection line`);
                        TPPNoTurns = true;
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor4",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor4});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "StopBlade1",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: StopBlade1});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor2",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor2});
                }
            }
        });


        namespace.addVariable({
            componentOf: device,
            browseName: "BConveyor3",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: BConveyor3});
                }
            }
        });

        let temp = false;
        let flag = true;

        function EmitterTimer(){
            if(start){
                setTimeout(()=>{
                    temp = true;  
                    //flag = false;
                },9000);
                return temp;
            } else {
                return temp;
            }
        }

        namespace.addVariable({
            componentOf: device,
            browseName: "E1",
            dataType: "Boolean",
            value: {
                get: function () {
                        return new opcua.Variant({dataType: opcua.DataType.Boolean,value: EmitterTimer() });                   
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