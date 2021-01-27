node { configuredStages {
    echo '***** Build-Pipeline::' + env.JOB_NAME

    if (env.BRANCH_NAME == 'master') {
        stage('release') {
          // Perform github release with assets, etc.
            sh """
                ./gradlew -si -Dorg.ajoberstar.grgit.auth.username=${GITHUB_TOKEN} -Dorg.ajoberstar.grgit.auth.password -PcloudliftFeatureArtifactoryJunction=true \
                lint \
                test \
                npm_run_build \
                sonarqube \
                cloudliftDockerPush \
                release
                """
        }
    } else {
        stage('lint') {
            sh './gradlew -si lint'
        }

        stage('test') {
            sh './gradlew -si test'
        }

        stage('sonar') {
            sh './gradlew -si sonarqube'
        }

        stage('build') {
            sh './gradlew -si npm_run_build'
        }

        stage('containerize') {
            sh './gradlew -si -PcloudliftFeatureArtifactoryJunction=true cloudliftDockerBuild'
        }

        stage('push-image') {
            sh './gradlew -i -PcloudliftFeatureArtifactoryJunction=true cloudliftDockerPush'
        }

    }

}}

def configuredStages(stageDefinitions) {

    def buildImageName = UUID.randomUUID().toString()

    checkout scm
    def buildImage = docker.build(buildImageName, '-f build.Dockerfile .')

    docker.image(buildImageName).inside('-v /var/run/docker.sock:/var/run/docker.sock') {
        withCredentials([
          string(credentialsId: 'sonar', variable: 'SONAR_TOKEN'),
          string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN'),
          string(credentialsId: 'swingletree_token', variable: 'SWINGLETREE_TWISTLOCK_TOKEN'),
          usernamePassword(credentialsId: 'twistlock', usernameVariable: 'TWISTLOCK_USER', passwordVariable: 'TWISTLOCK_PASSWORD'),
          usernamePassword(credentialsId: 'artifactory', usernameVariable: 'DOCKER_REGISTRY_USER', passwordVariable: 'DOCKER_REGISTRY_PASSWORD'),
          usernamePassword(credentialsId: 'hpsm', usernameVariable: 'HPSM_USER', passwordVariable: 'HPSM_PASSWORD')
        ]) {
            stageDefinitions()
        }
    }
}
