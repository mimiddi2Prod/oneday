package com.example.webview;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Build;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        WebView v =(WebView) findViewById(R.id.web);
        String strUrl = "https://jolly.oneday.youyueworld.com";
        //strUrl = "https://www.baidu.com";
        v.loadUrl(strUrl);
        // 允许 vue端使用 localStorage存储
        v.getSettings().setDomStorageEnabled(true);
        v.getSettings().setAppCacheMaxSize(1024*1024*8);//存储的最大容量
        String appCachePath = getApplicationContext().getCacheDir().getAbsolutePath();
        v.getSettings().setAppCachePath(appCachePath);
        v.getSettings().setAllowFileAccess(true);
        v.getSettings().setAppCacheEnabled(true);
        //设置了这个属性后我们才能在 WebView 里与我们的 Js 代码进行交互，对于 WebApp 是非常重要的，默认是 false，
        //因此我们需要设置为 true，这个本身会有漏洞，具体的下面我会讲到，
        //利用js进行页面跳转等需要
        v.getSettings().setJavaScriptEnabled(true);

        v.getSettings().setBlockNetworkImage(false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            // 解决http及https混合情况下页面加载问题
            v.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }
        v.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return super.shouldOverrideUrlLoading(view, url);
            }});
        };
}