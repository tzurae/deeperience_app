package com.deeperience;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.magus.fblogin.FacebookLoginPackage;

import java.util.Arrays;
import java.util.List;

// Add this line:
import com.oblador.vectoricons.VectorIconsPackage;
// Add this line:
import com.burnweb.rnsimplealertdialog.RNSimpleAlertDialogPackage;
// Add this line:
import com.i18n.reactnativei18n.ReactNativeI18n;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
                                         new MainReactPackage(),
                                         new RNSimpleAlertDialogPackage(),
                                         new VectorIconsPackage(),
                                         new ReactNativeI18n(),
                                         new FacebookLoginPackage()
                                         );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
