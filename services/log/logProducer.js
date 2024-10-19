const {channel} =require( '../../services/log/logProducer')
const {LOG_QUEUE} = require('../../config/constant')

const publishLog = (logId,logMessage,logObject,type)=>{
    const message = JSON.stringify({
        logId,
        logMessage,
        logObject,
        type,
        createdAt:new Date(),
    })
    channel.sendToQueue(LOG_QUEUE, JSON.stringify(message))
}


export const logMsg = (logId,logMessage,logObject) =>{
 publishLog(logId,logMessage,logObject,'log')
}

export const logError = (logId,logMessage,logObject) =>{
    publishLog(logId,logMessage,logObject,'error')
   }