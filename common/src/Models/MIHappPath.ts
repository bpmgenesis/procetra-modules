import { int } from '@tuval/core';
export interface MIHappyPath {
    caseDuration_max: int;
    caseDuration_mean: int;
    caseDuration_min: int;
    caseDuration_sum:int;
    caseDuration_all_sum:int;
    caseDuration_all_mean:int;
    count: int;
    count_sum:int;
    rate_count: int;
    rate_duration: int;
    variant: string;
}