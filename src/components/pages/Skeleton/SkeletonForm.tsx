import {
  SkeletonSubtitle,
  SkeletonTitle,
  SkeletonWrapper,
} from "../../../styles/Skeleton.styled";
import { Form, Input } from "../../../styles/Form.styled";
import Skeleton from "react-loading-skeleton";
import { Button } from "../../../styles/Global.styled";

export const FormSkeleton = () => {
  return (
    <SkeletonWrapper>
      <Form>
        <SkeletonTitle />
        <SkeletonSubtitle />
        <Input disabled />
        <SkeletonSubtitle />
        <Input disabled />
        <SkeletonSubtitle />
        <Input disabled />
        <SkeletonSubtitle />
        <Input disabled />
        <SkeletonSubtitle />
        <Input disabled />
        <Button disabled>
          <Skeleton width={1200} />
        </Button>
      </Form>
    </SkeletonWrapper>
  );
};
