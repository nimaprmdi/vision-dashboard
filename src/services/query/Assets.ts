class AssetsQuery {
    readonly publishAssetQuery = (imageId: string) => {
        return JSON.stringify({
            query: `mutation {
                        publishAsset(where: {id: "${imageId}" }) {
                            id
                        }
                    }`,
        });
    };
}

export default new AssetsQuery();
