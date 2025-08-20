const fs = require("fs");
const path = require("path");
const { withDangerousMod } = require("@expo/config-plugins");

function addPdfBoxDependency(androidAppBuildGradlePath) {
  let content = fs.readFileSync(androidAppBuildGradlePath, "utf8");
  const implLine = "implementation 'org.apache.pdfbox:pdfbox-android:2.0.27.0'";
  if (content.includes(implLine)) return false;

  // naive insertion into dependencies { ... }
  content = content.replace(
    /dependencies\s*\{/,
    (match) => `${match}\n ${implLine}`
  );
  fs.writeFileSync(androidAppBuildGradlePath, content, "utf8");
  return true;
}

module.exports = function withPdfBox(config) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const appBuildGradle = path.join(
        config.modRequest.projectRoot,
        "android",
        "app",
        "build.gradle"
      );
      try {
        if (fs.existsSync(appBuildGradle)) {
          addPdfBoxDependency(appBuildGradle);
        }
      } catch (e) {
        // fail silently — user can add dependency manually
        console.warn(
          "expo-plugin-pdftextextractor: failed to patch app/build.gradle",
          e
        );
      }
      return config;
    },
  ]);
};
