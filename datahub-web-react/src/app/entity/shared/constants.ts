import { EntityType } from '../../../types.generated';

// TODO(Gabe): integrate this w/ the theme
export const REDESIGN_COLORS = {
    GREY: '#e5e5e5',
    BLUE: '#1890FF',
};

export const ANTD_GRAY = {
    1: '#FFFFFF',
    2: '#FAFAFA',
    2.5: '#F8F8F8',
    3: '#F5F5F5',
    4: '#F0F0F0',
    4.5: '#E9E9E9',
    5: '#D9D9D9',
    6: '#BFBFBF',
    7: '#8C8C8C',
    8: '#595959',
    9: '#434343',
};

export const ANTD_GRAY_V2 = {
    1: '#F8F9Fa',
    2: '#F3F5F6',
    5: '#DDE0E4',
    6: '#B2B8BD',
    8: '#5E666E',
    10: '#1B1E22',
};

export const EMPTY_MESSAGES = {
    documentation: {
        title: '没有文档',
        description: '通过添加文档和有用资源的链接来积累知识。',
    },
    tags: {
        title: '没有标签',
        description: '标记实体以帮助它们更容易被发现，并指出它们最重要的属性。',
    },
    terms: {
        title: '没有属于',
        description: '将术语表术语应用于实体以对其数据进行分类。',
    },
    owners: {
        title: '没有负责人',
        description: '添加所有者可以帮助您跟踪谁对这些数据负责。',
    },
    properties: {
        title: '没有属性',
        description: '如果数据源中存在属性，则属性将出现在这里。',
    },
    queries: {
        title: '没有查询',
        description: '创建、查看和共享此数据集的常用查询。',
    },
    domain: {
        title: '没有域',
        description: '通过将相关实体添加到域中，根据您的组织结构对它们进行分组。',
    },
    dataProduct: {
        title: '没有数据产品',
        description: '通过将相关实体添加到数据产品中，根据共享特征对相关实体进行分组。',
    },
    contains: {
        title: 'Contains no Terms',
        description: 'Terms can contain other terms to represent a "Has A" style relationship.',
    },
    inherits: {
        title: 'Does not inherit from any terms',
        description: 'Terms can inherit from other terms to represent an "Is A" style relationship.',
    },
    'contained by': {
        title: 'Is not contained by any terms',
        description: 'Terms can be contained by other terms to represent a "Has A" style relationship.',
    },
    'inherited by': {
        title: 'Is not inherited by any terms',
        description: 'Terms can be inherited by other terms to represent an "Is A" style relationship.',
    },
    businessAttributes: {
        title: 'No business attributes added yet',
        description: 'Add business attributes to entities to classify their data.',
    },
};

export const ELASTIC_MAX_COUNT = 10000;

export const getElasticCappedTotalValueText = (count: number) => {
    if (count === ELASTIC_MAX_COUNT) {
        return `${ELASTIC_MAX_COUNT}+`;
    }

    return `${count}`;
};

export const ENTITY_TYPES_WITH_MANUAL_LINEAGE = new Set([
    EntityType.Dashboard,
    EntityType.Chart,
    EntityType.Dataset,
    EntityType.DataJob,
]);

export const GLOSSARY_ENTITY_TYPES = [EntityType.GlossaryTerm, EntityType.GlossaryNode];

export const DEFAULT_SYSTEM_ACTOR_URNS = ['urn:li:corpuser:__datahub_system', 'urn:li:corpuser:unknown'];

export const VIEW_ENTITY_PAGE = 'VIEW_ENTITY_PAGE';

// only values for Domain Entity for custom configurable default tab
export enum EntityProfileTab {
    DOMAIN_ENTITIES_TAB = 'DOMAIN_ENTITIES_TAB',
    DOCUMENTATION_TAB = 'DOCUMENTATION_TAB',
    DATA_PRODUCTS_TAB = 'DATA_PRODUCTS_TAB',
}
