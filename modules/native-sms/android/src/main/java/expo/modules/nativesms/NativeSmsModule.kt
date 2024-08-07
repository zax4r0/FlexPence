package expo.modules.nativesms

import android.content.Context
import android.net.Uri
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

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
            val context = appContext.reactContext ?: return@AsyncFunction emptyList<Map<String, Any>>()
            val smsUtils = SmsUtils(context)
            return@AsyncFunction smsUtils.readSMS()
        }

        AsyncFunction("asyncGreetings") { message: String ->
            return@AsyncFunction message
        }
    }
}
