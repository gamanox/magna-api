'use strict';
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.report.search(ctx.query);
        } else {
            entities = await strapi.services.report.find(ctx.query);
        }

        for (const entity of entities) {
            if (entity.employee && entity.employee.name) {
                delete entity.employee.name;
                delete entity.employee.created_at;
                delete entity.employee.updated_at;
            }
            if (entity.chassis && entity.chassis.welds) {
                delete entity.chassis.welds;
                delete entity.chassis.reference;
                delete entity.chassis.model_code;
                delete entity.chassis.created_at;
                delete entity.chassis.updated_at;
            }
            if (entity.report_welds) {
                for (var weld of entity.report_welds) {
                    delete weld.evidence;
                }

            }
        }

        return entities.map(entity =>
            sanitizeEntity(entity, { model: strapi.models.report })
        );
    },

    async findOne(ctx) {
        const entity = await strapi.services.report.findOne(ctx.params);
        if (entity.employee && entity.employee.name) {
            delete entity.employee.name;
            delete entity.employee.created_at;
            delete entity.employee.updated_at;
        }
        if (entity.chassis && entity.chassis.welds) {
            delete entity.chassis.welds;
            delete entity.chassis.reference;
            delete entity.chassis.model_code;
            delete entity.chassis.created_at;
            delete entity.chassis.updated_at;
        }
        if (entity.report_welds) {
            for (var weld of entity.report_welds) {
                delete weld.evidence;
            }

        }
        return sanitizeEntity(entity, { model: strapi.models.report });
    },
};