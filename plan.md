## Plan to Implement Asset Pair Selection and Live Updates

**Goal:** Allow users to select any desired asset pair (major/minor/exotic currencies, Deriv synthetic indices, and cryptocurrencies) and ensure live updates, particularly for pip value calculations.

**Files to Modify:**
1.  `src/lib/constants.ts`
2.  `src/components/market/MarketOverview.tsx`
3.  `src/components/calculators/PipValueCalculator.tsx`

**Steps:**

1.  **Update `src/lib/constants.ts`:**
    *   **Action:** Expand the existing asset lists (e.g., `FOREX_PAIRS`, `DERIV_SYNTHETIC_INDICES`, `CRYPTOCURRENCIES`) to include a comprehensive set of assets.
    *   **Details:** Define extensive arrays for each category. Ensure the format remains consistent with existing constants.

2.  **Modify `src/components/market/MarketOverview.tsx`:**
    *   **Action:** Implement a user-friendly asset selection mechanism.
    *   **Details:**
        *   Introduce state to manage the currently selected asset pair.
        *   Integrate a searchable dropdown or a similar component (e.g., using `react-select` or a custom implementation) populated with the expanded asset lists from `constants.ts`.
        *   Ensure the selected asset pair is accessible to other components, potentially through props or a context API.
        *   Prepare for live updates by adding a placeholder or structure for fetching/displaying real-time data based on the selected pair.

3.  **Update `src/components/calculators/PipValueCalculator.tsx`:**
    *   **Action:** Modify the component to dynamically use the selected asset pair.
    *   **Details:**
        *   Accept the selected `assetPair` as a prop or from a shared state.
        *   Refactor the pip value calculation logic to be dependent on the `assetPair`. This will likely involve looking up pair-specific conventions (e.g., base currency, quote currency, pip size).

**Verification:**
*   Test the selection of various asset pairs across Forex, cryptocurrencies, and synthetic indices.
*   Verify that the `PipValueCalculator` accurately reflects the pip value for the selected pair.
*   Ensure that no existing functionality in `MarketOverview.tsx` or other calculator components is broken.
*   Confirm that the UI remains responsive and adheres to the established design principles.

**Note:** This plan focuses on the selection mechanism and the necessary preparations for live updates. Actual integration with live data APIs will be a subsequent step if not already in place.
