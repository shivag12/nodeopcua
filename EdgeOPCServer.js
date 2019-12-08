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
let palletEmitterEmit = false;
let palletEmitterPart = 1;
let palletizerElevatorFrontLimit = false;
let palletizerDiffSensor = false;
let palletizerDiffSensor_flag = true;


let S1OutDiffuseSensor = false;
let S2OutDiffuseSensor = false;
let S2OutDiffuseSensor_flag = false;

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
let SCTargetPosition = 55;
let SCLeftPositioner = false;
let SCRightPositioner = false;
let SCLift = false;
let SCDiffuseSensor = false;
let SCDiffFlag = false;


//let palletizerDiffSensor = false;
let palletizerPush = false;
let palletizerOpenPlate = false;
let palletizerElevatorLimit = false;
let palletizerElevatorUp_new = false;
let palletizerElevatorDown = false;
let palletizerElevatorChain = false;
let palletizerChain = true;
let palletDiffSensorUp = false;
let palletDiffSensorUp_flag = false;
let palletizerClamp = false
let palletTurn = false;


//Turntable 
let PTurntableFrontLimit = false;
let PTurntableBackLimit = false;
let PTurntableRollPlus = true;
let PTurntableRollMinus = false;
let PTurntableRollTurn = false;


//Local Variables
let palletcount = 0;


let firstRack = [1,2,3,10,11,12,19,20,21,28,29,30,37,38,39];


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
                            // //console.log("Emitter Flag is false -->");
                            // setTimeout(()=>{
                            //     //console.log("Emitting the emitter");
                            //     S1EmitterEmit = true; 
                            //  },2000); 
                            //  setTimeout(()=>{  
                            //     //console.log("Stopping the emitter");
                            //     S1EmitterEmit = false;
                            //     S1Emitter_Flag = true;
                            //  },2500);

                            //console.log("Entering into rack position");
                            let randomValue = firstRack[Math.floor(Math.random()*firstRack.length)];
                            SCTargetPosition = randomValue;
                            console.log("Target position : "+randomValue);
                            //firstRack.splice(firstRack.indexOf(randomValue), 1);
                            S1Emitter_Flag = true;
                            palletEmitterEmit = true;
                            
                            // setTimeout(()=>{
                            //     palletizerElevatorUp = false;
                            // },1900)

                            setTimeout(()=>{
                                palletEmitterEmit = false;
                            },2000)

                            setTimeout(()=>{
                                SCRightPositioner = true;                                
                            },4000);

                            setTimeout(()=>{
                                SCLift = true;
                            },5200)

                            setTimeout(()=>{
                                SCRightPositioner = false
                            },6400)

                            setTimeout(()=>{
                                SCTargetPosition = 55;
                            },8000)

                            setTimeout(()=>{
                                SCLeftPositioner = true;
                            },12000)

                            setTimeout(()=>{
                                SCLift = false;
                            },13000)

                            setTimeout(()=>{
                                SCLeftPositioner = false;
                            },14000)

                            //  setTimeout(()=>{
                            //      console.log("Entering into rack position");
                            //     let randomValue = firstRack[Math.floor(Math.random()*firstRack.length)];
                            //     SCTargetPosition = randomValue;
                            //     console.log("Target position : "+randomValue);
                            //     firstRack.splice(firstRack.indexOf(randomValue), 1);
                            //     S1Emitter_Flag = true;
                            //  },2000);


                        }

                        // if(!S2Emitter_Flag){
                        //     //console.log("Emitter Flag is false -->");
                        //     setTimeout(()=>{
                        //         //console.log("Emitting the emitter");
                        //         S2EmitterEmit = true; 
                        //      },2000); 
                        //      setTimeout(()=>{  
                        //         //console.log("Stopping the emitter");
                        //         S2EmitterEmit = false;
                        //         S2Emitter_Flag = true;
                        //      },2500);
                        // }
                        // //S1EmitterEmit = true;
                    } else {
                        palletizerElevatorUp = false;
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
                        if(!S2OutDiffuseSensor_flag){
                            let randomValue = firstRack[Math.floor(Math.random() * firstRack.length)];
                            SCTargetPosition = randomValue;
                            console.log("Target position : " + randomValue);
                            //S1Emitter_Flag = true;

                            setTimeout(() => {
                                S2OutDiffuseSensor_flag = false;
                            }, 4100);

                            setTimeout(() => {
                                SCRightPositioner = true;
                            }, 4000);

                            setTimeout(() => {
                                SCLift = true;
                            }, 5200)

                            setTimeout(() => {
                                SCRightPositioner = false
                            }, 6400)

                            setTimeout(() => {
                                SCTargetPosition = 55;
                            }, 8000)

                            setTimeout(() => {
                                SCLeftPositioner = true;
                            }, 12000)

                            setTimeout(() => {
                                SCLift = false;
                            }, 13000)

                            setTimeout(() => {
                                SCLeftPositioner = false;
                            }, 14000)
                            S2OutDiffuseSensor_flag = true;

                        }

                        
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


        //Stacker Crane Target Position 
        namespace.addVariable({
            componentOf: device,
            browseName: "SCTargetPosition",
            dataType: "Double",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double,value: SCTargetPosition});
                },
                set : function(variable){
                    SCTargetPosition = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        
        //Stacker Crane Left Positioner 
        namespace.addVariable({
            componentOf: device,
            browseName: "SCLeftPositioner",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: SCLeftPositioner});
                },
                set : function(variable){
                    SCLeftPositioner = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

                //Stacker Crane Right Positioner 
                namespace.addVariable({
                    componentOf: device,
                    browseName: "SCRightPositioner",
                    dataType: "Boolean",
                    value: {
                        get: function () {
                            return new opcua.Variant({
                                dataType: opcua.DataType.Boolean,
                                value: SCRightPositioner
                            });
                        },
                        set: function (variable) {
                            SCRightPositioner = variable.value;
                            return opcua.StatusCodes.Good;
                        }
                    }
                });

                        //Stacker Crane Left Positioner 
        namespace.addVariable({
            componentOf: device,
            browseName: "SCLift",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: SCLift});
                },
                set : function(variable){
                    SCLift = variable.value;                    
                    return opcua.StatusCodes.Good;     
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "SCDiffuseSensor",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean,value: SCDiffuseSensor});
                },
                set : function(variable){
                    SCDiffuseSensor = variable.value;     
                    if(SCDiffuseSensor){
                        console.log("Going Inside the SC Diffuse Sensor Flag")
                        if(!SCDiffFlag){
                            setTimeout(() => {
                                SCDiffFlag = false;
                            }, 2200);
                            setTimeout(() => {
                                //console.log("Emitting the emitter");
                                S1EmitterEmit = true;
                            }, 2000);
                            setTimeout(() => {
                                //console.log("Stopping the emitter");
                                S1EmitterEmit = false;
                            }, 2500);
                            setTimeout(() => {
                                //console.log("Emitting the emitter");
                                S2EmitterEmit = true;
                            }, 2000);
                            setTimeout(() => {
                                //console.log("Stopping the emitter");
                                S2EmitterEmit = false;
                            }, 2500);
                            SCDiffFlag = true;
                        }
                    }               
                    return opcua.StatusCodes.Good;     
                }
            }
        });
                //Palletizer  
        namespace.addVariable({
            componentOf: device,
            browseName: "palletizerPush",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletizerPush
                    });
                },
                set: function (variable) {
                    palletizerPush = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        //Palletizer  
        namespace.addVariable({
            componentOf: device,
            browseName: "palletizerOpenPlate",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletizerOpenPlate
                    });
                },
                set: function (variable) {
                    palletizerOpenPlate = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

                        //Palletizer  
        namespace.addVariable({
            componentOf: device,
            browseName: "palletizerElevatorLimit",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletizerElevatorLimit
                    });
                },
                set: function (variable) {
                    palletizerElevatorLimit = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });


                        //Palletizer  
        namespace.addVariable({
            componentOf: device,
            browseName: "palletizerDiffSensor",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletizerDiffSensor
                    });
                },
                set: function (variable) {
                    palletizerDiffSensor = variable.value;
                    //console.log("Palletizer Diff Sensor : "+palletizerDiffSensor);
                    if(palletizerDiffSensor){

                        if(palletizerDiffSensor_flag){
                            setTimeout(() => {
                                palletizerChain = false;
                                palletizerElevatorLimit = true;
                            }, 3500);
                            setTimeout(() => {
                                palletizerElevatorUp_new = true;                                
                            }, 4000);
                            setTimeout(()=>{
                                palletizerElevatorLimit = false;
                                palletizerDiffSensor_flag = true;
                            },5500)
                            palletizerDiffSensor_flag = false;
                        }                                            

                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });


        /**
         * Palletizer Diffuse Sensor 
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "palletDiffSensorUp",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletDiffSensorUp
                    });
                },
                set: function (variable) {
                    palletDiffSensorUp = variable.value;
                    if(palletDiffSensorUp){
                        /**
                         * Pallet Push & Open Plate has to be Maintened. 
                         * Three Packets needs to be pushed here. Need to Maintain the count of Boxes which need to go in. 
                         * After three is pushed. Elevator has to go down a bit and then Three boxes gets kicked in. 
                         */

                        if(!palletDiffSensorUp_flag){

                             palletcount = palletcount + 1;
    
                             console.log("Pallet Count "+palletcount);
                             setTimeout(() => {
                                palletDiffSensorUp_flag = false;                                 
                             }, 2000);
    
                             if(palletcount === 3){
                                 /**
                                  * Open the plate & Elevator down to one step.
                                  */
                                 console.log("Three Boxes has been filled");
                                 setTimeout(()=>{
                                    palletizerPush = true;
                                 },3000);
        
                                 setTimeout(()=>{
                                     palletizerPush = false;
                                     //palletDiffSensorUp_flag = false;
                                 },4500);
                             } else if (palletcount === 6){
                                 /**
                                  * Need to Open the plate. and then one step has to go down.
                                  */
                                 setTimeout(()=>{
                                    palletizerPush = true;
                                 },3000);
        
                                 setTimeout(()=>{
                                     palletizerPush = false;
                                 },4500);

                                 setTimeout(() => {
                                    palletizerClamp = true;
                                 }, 6000);

                                 setTimeout(() => {
                                    palletizerClamp = false;
                                 }, 7500);

                                 setTimeout(() => {
                                     palletizerOpenPlate = true;
                                 }, 8500);

                                 setTimeout(() => {
                                     palletizerElevatorDown = true;
                                 }, 10500);

                                 setTimeout(() => {
                                    palletizerOpenPlate = false;
                                }, 12000);

                                setTimeout(() => {
                                    palletizerElevatorDown = false;
                                    palletizerElevatorUp_new = false;
                                }, 14000);

                                setTimeout(() => {
                                    palletizerElevatorLimit = true;
                                }, 15000);

                                setTimeout(() => {
                                    palletizerElevatorDown = true;
                                }, 16000);

                                setTimeout(() => {
                                    palletizerChain = true;
                                    palletEmitterEmit = true;
                                }, 18000);

                                setTimeout(()=>{
                                    palletizerElevatorDown = false;
                                    palletEmitterEmit = false;
                                },19000);

                                palletcount = 0;
                             }

                             palletDiffSensorUp_flag = true;                             
                        }                         
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });

        /**
         * Palletizer Clamp
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "palletTurn",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletTurn
                    });
                },
                set: function (variable) {
                    palletTurn = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        /**
         * Palletizer Clamp
         */
        namespace.addVariable({
            componentOf: device,
            browseName: "palletizerClamp",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletizerClamp
                    });
                },
                set: function (variable) {
                    palletizerClamp = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });


                //Palletizer  
                namespace.addVariable({
                    componentOf: device,
                    browseName: "palletizerElevatorDown",
                    dataType: "Boolean",
                    value: {
                        get: function () {
                            return new opcua.Variant({
                                dataType: opcua.DataType.Boolean,
                                value: palletizerElevatorDown
                            });
                        },
                        set: function (variable) {
                            palletizerElevatorDown = variable.value;
                            return opcua.StatusCodes.Good;
                        }
                    }
                });

                        //Palletizer  
        namespace.addVariable({
            componentOf: device,
            browseName: "palletizerElevatorChain",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletizerElevatorChain
                    });
                },
                set: function (variable) {
                    palletizerElevatorChain = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "palletizerChain",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletizerChain
                    });
                },
                set: function (variable) {
                    palletizerChain = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "palletEmitterEmit",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletEmitterEmit
                    });
                },
                set: function (variable) {
                    palletEmitterEmit = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "palletEmitterPart",
            dataType: "Double",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Double,
                        value: palletEmitterPart
                    });
                },
                set: function (variable) {
                    palletEmitterPart = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "palletizerElevatorUp_new",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: palletizerElevatorUp_new
                    });
                },
                set: function (variable) {
                    palletizerElevatorUp_new = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "PTurntableFrontLimit",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: PTurntableFrontLimit
                    });
                },
                set: function (variable) {
                    PTurntableFrontLimit = variable.value;
                    if(PTurntableFrontLimit){
                        PTurntableRollPlus = false;
                        PTurntableRollTurn = true;
                        setTimeout(() => {
                            PTurntableRollMinus = true;
                        }, 3000);
                        setTimeout(() => {
                            PTurntableRollMinus = false;
                        }, 5500);
                        setTimeout(() => {
                            PTurntableRollTurn = false;
                            PTurntableRollPlus = true;
                        }, 7500);
                    }
                    return opcua.StatusCodes.Good;
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "PTurntableRollMinus",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: PTurntableRollMinus
                    });
                },
                set: function (variable) {
                    PTurntableRollMinus = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "PTurntableRollPlus",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: PTurntableRollPlus
                    });
                },
                set: function (variable) {
                    PTurntableRollPlus = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "PTurntableRollTurn",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: PTurntableRollTurn
                    });
                },
                set: function (variable) {
                    PTurntableRollTurn = variable.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "PTurntableBackLimit",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({
                        dataType: opcua.DataType.Boolean,
                        value: PTurntableBackLimit
                    });
                },
                set: function (variable) {
                    PTurntableBackLimit = variable.value;
                    if(PTurntableBackLimit){
                        // setTimeout(()=>{
                        //     PTurntableRollMinus = false;
                        //     PTurntableRollTurn = false;
                        // },2000);
                        // setTimeout(()=>{
                        //     PTurntableRollPlus = true;
                        // },3000);
                    }
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