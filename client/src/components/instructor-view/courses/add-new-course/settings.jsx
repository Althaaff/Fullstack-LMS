import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

const CourseSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          <Label>Upload Course Image</Label>

          <Input type="file" accept="image/*"></Input>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSettings;
