export default function combineContext(...providers) {
    return ({ children }) => {
        return providers.reduceRight((accumulator, Currentprovider) => {
            return <Currentprovider>{accumulator}</Currentprovider>;
        }, children /* Initial Value */);
    };
}

/** 
 * This combines multiple context providor together and returns a single context providor.
 * 
 * <A>
        <B>
            <C>
                <D>
                    {children}
                </D>
            </C>
        </B>
    </A>
 */

/**
 * <Combined>
 *      {children}
 * </Combined>
 */
