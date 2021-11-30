<p align="center">
<img src="https://raw.githubusercontent.com/LeParadoxHD/testing-labs/main/resources/github.svg">
</p>
<p align="center">
<b>A spiritual successor of <a href="https://github.com/cometa-rocks/cometa">Cometa</a> focused on testing for people without programming knowledge.</b>
</p>

### Major features:

- Free-to-use software
- Web and native apps testing
- Easy setup on the cloud

### Technologies used:

- Docker
- Docker-Compose
- Typescript (Front)
- Angular (Front)
- NestJS (API Server)
- Redis (Cache)
- Selenoid (Selenium Grid)
- WebdriverIO (Webdriver for Chrome, Firefox, Edge, Opera and IE)
- TensorFlow (Front & Backend)

## Testing Labs Cloud (BETA)
Our current Selenium Grid provides up to 170 nodes (shared amongst all users):
- `100` desktop/mobile Chromium based browser sessions (Chrome and Firefox) [free]
- `30` desktop/mobile Firefox browser sessions [free]
- `20` native mobile apps (Android 8+ and iOS 12+) [paid]

Request access to our cloud by filling the form in the **experimental features page**. If you're eligible for BETA access, you will get a plugin zip allowing you to use our Cloud. See Plugins section for installation info.

## Paid or on demand features

* **Advanced test editor**:
    * **Completion AI (TensorFlow)**: Quickly select the best step based on your input, keywords, or description of what you pretend to do.
    * **Visual Scratch**: With this mode you will be able to better comprehend your tests workflow and edit by drag and drop your desired steps.
    * **Step category**: List your steps by their behavior or by your own tags, even mark them as favourites
    * **Nested tests**: Allows to group tests or run a test with predefined steps (up to 5 nested tests)
* **Web/App AI analysis (TensorFlow)**:
    * Our AI will scan your website or mobile app to look for visual, functional, accessibility or performance issues.
    * After scan completion, you can opt to create an automatic test for future usage and testing.
* **Storage**:
    * Up to **1 TB of storage** for tests, screenshots and videos (per user).

# Requirements

- Docker
- Docker Compose
- NodeJS 17 (if run locally)

# Getting started

### Installation

```sh
docker-compose up -d
```

**Testing Labs** will be ready when all the container are marked as _healthy_ and will be available at port 80 and 443.

You can optionally run `docker-compose logs -f` to see all the logs as the first setup takes some minutes.

### To run in development mode:

Modify the `docker-compose.yml` _mode_ variable from `prod` to `dev`.

### Plugins

Place your own, beta or paid plugins in the `plugins` folder.
**NOTES:** Instructions on how to write plugins will be provided in the future.

## Backups

* A daily backup of each test is done at midnight, up to 7 days.
* Screenshots and video resources are not included in backups.

## Private repo

All paid features are available at our <a href="https://github.com/LeParadoxHD/testing-labs">private repo</a>
