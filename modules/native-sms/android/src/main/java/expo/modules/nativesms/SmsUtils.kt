package expo.modules.nativesms

import android.content.Context
import android.net.Uri

data class SMSMessage(
    val message: String,
    val sender: String,
    val date: Long,
    val read: Boolean,
    val type: Int,
    val thread: Int,
    val service: String
)

class SmsUtils(private val context: Context) {

    fun readSMS(): List<Map<String, Any>> {
        val inboxMessages = readMessages("inbox")
        val sentMessages = readMessages("sent")
        return (inboxMessages + sentMessages)
            .groupBy { it.sender }
            .map { (sender, messages) ->
                mapOf(
                    "sender" to sender,
                    "messages" to messages.map { it.toMap() }
                )
            }
    }

    private fun readMessages(type: String): List<SMSMessage> {
        val messages = mutableListOf<SMSMessage>()
        val cursor = context.contentResolver.query(
            Uri.parse("content://sms/$type"),
            null,
            null,
            null,
            null
        )
        cursor?.use {
            val indexMessage = it.getColumnIndex("body")
            val indexSender = it.getColumnIndex("address")
            val indexDate = it.getColumnIndex("date")
            val indexRead = it.getColumnIndex("read")
            val indexType = it.getColumnIndex("type")
            val indexThread = it.getColumnIndex("thread_id")
            val indexService = it.getColumnIndex("service_center")

            while (it.moveToNext()) {
                messages.add(
                    SMSMessage(
                        message = it.getString(indexMessage),
                        sender = it.getString(indexSender),
                        date = it.getLong(indexDate),
                        read = it.getInt(indexRead) == 1,
                        type = it.getInt(indexType),
                        thread = it.getInt(indexThread),
                        service = it.getString(indexService) ?: ""
                    )
                )
            }
        }
        return messages
    }

    fun SMSMessage.toMap(): Map<String, Any> {
        return mapOf(
            "message" to message,
            "sender" to sender,
            "date" to date,
            "read" to read,
            "type" to type,
            "thread" to thread,
            "service" to service
        )
    }
}
