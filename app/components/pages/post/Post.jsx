import Field from "../../ui/Field";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import { PostCard } from "../../ui/Post";

import { JOB_TYPES_OPTIONS } from "../../../constants";

export default function Post({ i, errors = {}, className = "" }) {
  return (
    <PostCard
      key={i}
      className={[
        "flex flex-col items-stretch justify-start gap-6",
        className,
      ].join(" ")}
    >
      <div className="flex flex-row items-start justify-start flex-wrap gap-6">
        <h3 className="font-medium text-xl">#{i + 1}</h3>
        <div className="flex-1 flex flex-col items-stretch justify-start gap-6">
          <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
            <Field
              id={`posts[${i}].title`}
              error={errors?.[`posts[${i}].title`]}
              name={`posts[${i}].title`}
              type="text"
              label="Title"
              placeholder="Eg. Android Developer"
            />
            <Field
              component={Select}
              id={`posts[${i}].type`}
              error={errors?.[`posts[${i}].type`]}
              name={`posts[${i}].type`}
              label="Type"
              options={JOB_TYPES_OPTIONS}
              defaultOption={JOB_TYPES_OPTIONS[0]}
            />
          </div>
          <Field
            id={`posts[${i}].location`}
            error={errors?.[`posts[${i}].location`]}
            name={`posts[${i}].location`}
            type="text"
            label="Location"
            placeholder="Eg. Remote, Bangalore, London"
          />
          <div className="flex-1 flex flex-col items-stretch justify-start gap-2">
            <p className="font-medium text-sm uppercase flex flex-row items-baseline justify-start gap-2">
              <span>Salary range</span>
              <span className="text-green-200">($ / year)</span>
            </p>
            <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
              <Field
                id={`posts[${i}].salaryStart`}
                error={errors?.[`posts[${i}].salaryStart`]}
                name={`posts[${i}].salaryStart`}
                type="number"
                label="Start"
                placeholder="Eg. 15000"
              />
              <Field
                id={`posts[${i}].salaryEnd`}
                error={errors?.[`posts[${i}].salaryEnd`]}
                name={`posts[${i}].salaryEnd`}
                type="number"
                label="End"
                placeholder="Eg. 17000"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-stretch justify-start gap-2">
            <p className="font-medium text-sm uppercase">Apply Options</p>
            <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
              <Field
                id={`posts[${i}].applyLink`}
                error={errors?.[`posts[${i}].applyLink`]}
                name={`posts[${i}].applyLink`}
                type="url"
                label="Link"
                placeholder="Eg. https://careers.google.com"
                required={false}
              />
              <Field
                id={`posts[${i}].applyEmail`}
                error={errors?.[`posts[${i}].applyEmail`]}
                name={`posts[${i}].applyEmail`}
                type="email"
                label="Email"
                placeholder="Eg. jobs@google.com"
                required={false}
              />
            </div>
          </div>
          <Field
            component={Textarea}
            id={`posts[${i}].description`}
            error={errors?.[`posts[${i}].description`]}
            name={`posts[${i}].description`}
            label="Description"
            placeholder="Describe the job here; areas of responsibility, typical day of candidate, skills and qualifications required to perform the role."
            rows="5"
            required={false}
          />
          <Field
            id={`posts[${i}].tags`}
            error={errors?.[`posts[${i}].tags`]}
            name={`posts[${i}].tags`}
            type="text"
            label="Tags (Comma separated, max 6)"
            placeholder="Eg. flutter, android, anything"
            required={false}
          />
        </div>
      </div>
    </PostCard>
  );
}
