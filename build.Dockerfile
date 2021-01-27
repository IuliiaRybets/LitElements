# Derive from a base image containing java 11 and gradle (use the latest available version here)
FROM docker-release.artifacts.ruv.de/baumeister/java:openjdk-11-gradle

# As root, install additional necessary stuff which is needed for the build, but not included in the base image above
USER root

RUN yum install -y chromium-headless fontconfig

# Set some necessary environment variables for npm and chromium to work
#ENV NPM_REGISTRY http://nexus.ruv.de:8381/nexus3/repository/npm-all/
#ENV SASS_BINARY_SITE https://nexus.ruv.de:8443/nexus3/repository/node-sass-releases/
ENV CHROME_BIN /usr/lib64/chromium-browser/headless_shell

# Switch back to unprivileged user account
USER niemand

# No ENTRYPOINT as this comes from the base image

# CMD can be empty
CMD []
