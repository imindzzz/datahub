import { OwnershipType, OwnershipTypeEntity } from '../../../../../../../types.generated';

/**
 * A mapping from OwnershipType to it's display name & description. In the future,
 * we intend to make this configurable.
 */
export const OWNERSHIP_DISPLAY_TYPES = [
    {
        type: OwnershipType.TechnicalOwner,
        name: '技术负责人',
        description: '参与资产的生产、维护或分配的。',
    },
    {
        type: OwnershipType.BusinessOwner,
        name: '业务负责制',
        description: '与资产相关的主要涉众或领域专家。',
    },
    {
        type: OwnershipType.DataSteward,
        name: '数据管家',
        description: '参与资产的治理。',
    },
    {
        type: OwnershipType.None,
        name: '无',
        description: '没有指定所有权类型。',
    },
];

const ownershipTypeToDetails = new Map();
OWNERSHIP_DISPLAY_TYPES.forEach((ownershipDetails) => {
    ownershipTypeToDetails.set(ownershipDetails.type, ownershipDetails);
});

export const getNameFromType = (type: OwnershipType) => {
    return ownershipTypeToDetails.get(type)?.name || type;
};

export const getDescriptionFromType = (type: OwnershipType) => {
    return ownershipTypeToDetails.get(type)?.description || 'No description';
};

export function getOwnershipTypeName(ownershipType?: OwnershipTypeEntity | null) {
    return ownershipType?.info?.name || 'Other';
}
