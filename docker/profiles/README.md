

docker save acryldata/datahub-frontend-react:debug acryldata/datahub-upgrade:debug acryldata/datahub-gms:debug acryldata/datahub-mysql-setup:debug acryldata/datahub-kafka-setup:debug acryldata/datahub-elasticsearch-setup:debug > datahub.tar
docker save \
  acryldata/datahub-frontend-react:debug \
  acryldata/datahub-upgrade:debug \
  acryldata/datahub-gms:debug \
  acryldata/datahub-mysql-setup:debug \
  acryldata/datahub-kafka-setup:debug \
  acryldata/datahub-elasticsearch-setup:debug > datahub.tar

docker load < datahub.tar


docker save acryldata/datahub-frontend-react:v0.13.3-SNAPSHOT acryldata/datahub-upgrade:v0.13.3-SNAPSHOT acryldata/datahub-gms:v0.13.3-SNAPSHOT acryldata/datahub-mysql-setup:v0.13.3-SNAPSHOT acryldata/datahub-kafka-setup:v0.13.3-SNAPSHOT acryldata/datahub-elasticsearch-setup:v0.13.3-SNAPSHOT > datahub.prod.tar

docker save \
  acryldata/datahub-frontend-react:v0.13.3-SNAPSHOT \
  acryldata/datahub-upgrade:v0.13.3-SNAPSHOT \
  acryldata/datahub-gms:v0.13.3-SNAPSHOT \
  acryldata/datahub-mysql-setup:v0.13.3-SNAPSHOT \
  acryldata/datahub-kafka-setup:v0.13.3-SNAPSHOT \
  acryldata/datahub-elasticsearch-setup:v0.13.3-SNAPSHOT > datahub.prod.tar

docker load < datahub.prod.tar

https://ps-training.oss-cn-chengdu.aliyuncs.com/datahub.prod.tar

git clone https://github.com/imindzzz/datahub.git datahub -branch hotfix/v0.13.2-fuchuan --single-branch
git checkout -b hotfix/v0.13.2-fuchuan origin/hotfix/v0.13.2-fuchuan

docker compose -p datahub --profile debug -f docker-compose.yml up

docker compose -p datahub --profile debug -f docker-compose.yml  restart datahub-gms-debug system-update-debug frontend-debug

scp datahub.tar root@192.168.124.22:/root

https://cloud.tencent.com/developer/article/1701451
yum -y install docker-ce-26.1.3-1.el7
# Docker Compose Profiles

This directory contains a set of docker compose definitions which are designed to run several configurations
for quickstart use-cases as well as development use-cases. These configurations cover a few of the wide variety of
infrastructure configurations that DataHub can operate on.

Requirements:
* Using profiles requires docker compose >= 2.20.
* If using the debug/development profiles, you will need to have built the `debug` docker images locally. See the Development Profiles section for more details.

```bash
$ cd docker/profiles
$ docker compose --profile <profile name> up
```

Use Control-c (`^c`) to terminate the running system. This will automatically stop all running containers.

To remove the containers use the following:

```bash
docker compose --profile <profile name> rm
```

Please refer to docker's documentation for more details.

The following sections detail a few of the profiles and their intended use-cases. For a complete list of profiles
and their configuration please see the table at the end of each section.

## Quickstart Profiles

Quickstart profiles are primarily a way to test drive DataHub features before committing to a production ready deployment.
A couple of these profiles are also used in our continuous integration (CI) tests.

Note: Quickstart profiles use docker images with the `head` tag. These images up updated when changes are committed
to the DataHub github repository. This can be overridden to use a stable release tag by prefixing the commands with 
`DATAHUB_VERSION=v0.12.1` for example.

### `quickstart`

This is the default configuration MySQL and OpenSearch for the storage and GMS running with integrated consumers.

### `quickstart-consumers`

This configuration is identical to `quickstart` how it runs standalone consumers instead of consumers integrated with the GMS container.

### `quickstart-postgres`

Identical to `quickstart` with Postgres instead of MySQL.

### `quickstart-cassandra`

Uses Cassandra as the primary data store along with Neo4j as the graph database.

### `quickstart-storage`

Just run the `quickstart` data stores without the DataHub components. This mode is useful for debugging when running the frontend and GMS components outside
of docker.

### Quickstart Profiles Table
| Profile Name         | MySQL | Postgres | Cassandra | Neo4j | Frontend | GMS | Actions | SystemUpdate | MAE | MCE | Kafka | OpenSearch |
|----------------------|-------|----------|-----------|-------|----------|-----|---------|--------------|-----|-----|-------|------------|
| quickstart           | X     |          |           |       | X        | X   | X       | X            |     |     | X     | X          |
| quickstart-frontend  | X     |          |           |       | X        |     |         | X            |     |     | X     | X          |
| quickstart-backend   | X     |          |           |       |          | X   | X       | X            |     |     | X     | X          |
| quickstart-postgres  |       | X        |           |       | X        | X   | X       | X            |     |     | X     | X          |
| quickstart-cassandra |       |          | X         | X     | X        | X   | X       | X            |     |     | X     | X          |
| quickstart-consumers | X     |          |           |       | X        | X   | X       | X            | X   | X   | X     | X          |
| quickstart-storage   | X     |          |           |       |          |     |         |              |     |     | X     | X          |

## Development Profiles

* Runs `debug` tagged images
* JVM Debug Mode Enabled
* Exposes local jars and scripts to the containers
* Can run non-default one-off configurations (neo4j, cassandra, elasticsearch)

The docker images used are the `debug` images which are created by building locally. These images are
created by running the gradle command.

```bash
./gradlew dockerTagDebug
```

For a complete list of profiles see the table at the end of this section.

### `quickstart-backend`

Run everything except for the `frontend` component. Useful for running just a local (non-docker) frontend.

### `quickstart-frontend`

Runs everything except for the GMS. Useful for running just a local (non-docker) GMS instance.

### Development Profiles Table
| Profile Name        | MySQL | Postgres | Cassandra | Neo4j | Frontend | GMS | Actions | SystemUpdate | MAE | MCE | Kafka | OpenSearch | Elasticsearch |
|---------------------|-------|----------|-----------|-------|----------|-----|---------|--------------|-----|-----|-------|------------|---------------|
| debug               | X     |          |           |       | X        | X   | X       | X            |     |     | X     | X          |               |
| debug-frontend      | X     |          |           |       | X        |     |         | X            |     |     | X     | X          |               |
| debug-backend       | X     |          |           |       |          | X   | X       | X            |     |     | X     | X          |               |
| debug-postgres      |       | X        |           |       | X        | X   | X       | X            |     |     | X     | X          |               |
| debug-cassandra     |       |          | X         |       | X        | X   | X       | X            |     |     | X     | X          |               |
| debug-consumers     | X     |          |           |       | X        | X   | X       | X            | X   | X   | X     | X          |               |
| debug-neo4j         | X     |          |           | X     | X        | X   | X       | X            |     |     | X     | X          |               |
| debug-elasticsearch | X     |          |           |       | X        | X   | X       | X            |     |     | X     |            | X             |