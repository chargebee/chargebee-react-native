

# [2.0.0-beta.6](https://github.com/chargebee/chargebee-react-native/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2023-04-28)


### Bug Fixes

* change double to number to follow ts types ([62a0b84](https://github.com/chargebee/chargebee-react-native/commit/62a0b842feed40882e601abf2a45b9318d5aef27))
* pass empty fields for customer object for android ([87fce9b](https://github.com/chargebee/chargebee-react-native/commit/87fce9ba93039878714eb45c71bb5df562c1f759))

# [2.0.0-beta.5](https://github.com/chargebee/chargebee-react-native/compare/v2.0.0-beta.2...v2.0.0-beta.5) (2023-04-27)


### Bug Fixes

* price field for android ([#114](https://github.com/chargebee/chargebee-react-native/issues/114)) ([c22e701](https://github.com/chargebee/chargebee-react-native/commit/c22e701e9b02162541243e8ba5fc377aaf17f4ed))


# 2.0.0-beta.4 (2023-04-21)


### Bug Fixes

* fixes android release issue ([2be5f79](https://github.com/chargebee/chargebee-react-native/commit/2be5f79a7c2918b95361e201df727d6f3fe60f23))


# [2.0.0-beta.3](https://github.com/chargebee/chargebee-react-native/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2023-04-19)


### Bug Fixes

* fixes response type of configure sdk ([#106](https://github.com/chargebee/chargebee-react-native/issues/106)) ([99f8821](https://github.com/chargebee/chargebee-react-native/commit/99f88218b2786afd8c89cbeee2249c29f50babef))


# [2.0.0-beta.2](https://github.com/chargebee/chargebee-react-native/compare/v1.1.6...v2.0.0-beta.2) (2023-04-13)


### Bug Fixes

* sends the package name to the cb android SDK ([8a29370](https://github.com/chargebee/chargebee-react-native/commit/8a29370805a3019aa88bd115366134360ed54ffb))
* Supporting IAP (#81) ([2617d87](https://github.com/chargebee/chargebee-react-native/commit/2617d87a40cef92e811d562f08dbb405807e742a)), closes [#81](https://github.com/chargebee/chargebee-react-native/issues/81)

### Features
* adds android retrieve products implementation ([e391bcb](https://github.com/chargebee/chargebee-react-native/commit/e391bcb6cbbabde138cde8ab5f772eb58bf1b774))
* adds api to configure chargebee android sdk ([8a6da62](https://github.com/chargebee/chargebee-react-native/commit/8a6da6222a531fc6d9054c8635b1e0e27c7f8184))
* adds api to configure chargebee ios sdk ([3a70cb3](https://github.com/chargebee/chargebee-react-native/commit/3a70cb32bbedc172b5f7e93b865c8d0a61b838b1))
* adds fetch subscriptions api ([3930434](https://github.com/chargebee/chargebee-react-native/commit/3930434c26c62df706bee8b6f0570720d6f502a7))
* adds ios retrieve products implementation ([3270a61](https://github.com/chargebee/chargebee-react-native/commit/3270a6119c0fe67ce4d8955cab3c320429a81c28))
* adds purchase products api implementation ([6398208](https://github.com/chargebee/chargebee-react-native/commit/6398208d211cc83210a832a5628dd4c2a1df2b5f))
* adds purchase products api response ([0ed6109](https://github.com/chargebee/chargebee-react-native/commit/0ed6109b3f2773e603a1b7a078b4ea202221194e))
* adds purchase products api skeleton ([9d83c5b](https://github.com/chargebee/chargebee-react-native/commit/9d83c5b89de90d83a3c122ea6cefd7920d8491e6))
* adds response handling for android config sdk api ([d814547](https://github.com/chargebee/chargebee-react-native/commit/d814547758545a0bf8f13cb6f4ea332b7b8ccedc))
* adds response handling for config sdk api ([59e5c66](https://github.com/chargebee/chargebee-react-native/commit/59e5c66d698d85646813357a61604ff9703f5e9a))
* adds response handling for ios config sdk api ([82c16ec](https://github.com/chargebee/chargebee-react-native/commit/82c16ec8486f1544ef891aaae7c224030bc2e6a6))
* adds retrieve product identifiers implementation ([5e50c76](https://github.com/chargebee/chargebee-react-native/commit/5e50c76742e545dc883b52f3d9371f156520c84c))
* adds retrieve products implementation ([c091cfb](https://github.com/chargebee/chargebee-react-native/commit/c091cfb6ed745c4c823ad914e3fa364877fc9bfa))
* handles error case for purchase products api response ([03a4e7e](https://github.com/chargebee/chargebee-react-native/commit/03a4e7ed06056b4b4acf786374bafa166e34a633))
* handles subscription and plan id as mandatory in purchase product api ([aa0bf7c](https://github.com/chargebee/chargebee-react-native/commit/aa0bf7cecec105b7ea8e3350e70a5fa88617c35d))

### BREAKING CHANGES
* Adds In-App Purchase support