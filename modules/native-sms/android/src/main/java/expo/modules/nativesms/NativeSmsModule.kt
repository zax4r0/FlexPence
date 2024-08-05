package expo.modules.nativesms

import android.content.Context
import android.net.Uri
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition


data class SMSMessage(
    val message: String,
    val sender: String,
    val date: Long,
    val read: Boolean,
    val type: Int,
    val thread: Int,
    val service: String
)

class NativeSmsModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
    override fun definition() = ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('NativeSms')` in JavaScript.
        Name("NativeSms")

        // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
        Function("helloWorld") {
            return@Function "Hello, world!"
        }

        AsyncFunction("readSMSAsync") {
            return@AsyncFunction readSMS()
        }

        AsyncFunction("asyncGreetings") { message: String ->
            return@AsyncFunction message
        }
    }

    private fun readSMS(): List<Map<String, Any>> {
        val context = appContext.reactContext ?: return emptyList()
        val inboxMessages = readMessages(context, "inbox")
        val sentMessages = readMessages(context, "sent")
        return (inboxMessages + sentMessages).map { it.toMap() }
    }

    // @see https://github.com/stevdza-san/ReadSMSDemo/blob/master/app/src/main/java/com/stevdza/san/readsmsdemo/MainScreen.kt#L76
    private fun readMessages(context: Context, type: String): List<SMSMessage> {
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

    private fun SMSMessage.toMap(): Map<String, Any> {
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
