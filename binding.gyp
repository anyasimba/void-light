{
  "targets": [
    {
      "target_name": "binding",
      "sources": [ "server/native/+.cc" ],
      "conditions": [
        ['OS=="linux"', {
          "cflags_cc": [ "-std=c++14" ]
        }],
        ['OS=="mac"', {
          "xcode_settings": {
            "OTHER_CFLAGS": [ "-std=c++14" ]
          },
        }]
      ]
    },
  ],
}