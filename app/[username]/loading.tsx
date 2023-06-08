import { FC} from "react";
import { CardSkeleton } from "@/components/card-skeleton";
interface LoadingProps {
    
}
 
const Loading: FC<LoadingProps> = () => {
    return ( 
        <CardSkeleton/>
    );
}
 
export default Loading;