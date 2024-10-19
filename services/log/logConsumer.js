const {channel,connectRabbitMQ} = require('../../config/rabbit.config')
const {LOG_QUEUE} = require('../../config/constant')

export const startLogConsumer = async()=>{
  await connectRabbitMQ()
channel.consume(LOG_QUEUE,async(msg)=>{
    if(msg !==null){
const logData = JSON.parse(msg.content.toString())
    }

    
})
}