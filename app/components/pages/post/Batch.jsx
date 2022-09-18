import { useState, Fragment } from "react";

import Field from "../../ui/Field";
import FileInput from "../../ui/FileInput";
import Select from "../../ui/Select";
import Slider from "../../ui/Slider";
import Textarea from "../../ui/Textarea";
import { addColorBoxToOptions } from "../../ui/ColorBox";

import Post from "./Post";

import { BRAND_COLOR_OPTIONS, JOB_EXPIRE_OPTIONS } from "../../../constants";
import { PostCardWrapper } from "../../ui/Post";

const BRAND_COLOR_OPTIONS_WITH_BALL = addColorBoxToOptions(BRAND_COLOR_OPTIONS);

export default function Batch({ postCount, setPostCount, errors = {} }) {
  const [color, setColor] = useState(BRAND_COLOR_OPTIONS[11].value);

  return (
    <Fragment>
      <section
        id="section-company"
        className="flex flex-col items-stretch justify-start gap-6"
      >
        <h2 className="font-medium text-2xl">Enter company information</h2>

        <div className="flex flex-col items-stretch justify-start gap-4">
          <Field
            id="name"
            name="name"
            type="text"
            label="Name"
            placeholder="Eg. Google"
            error={errors?.name}
          />
          <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
            <Field
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Eg. google@gmail.com"
              secret
              error={errors?.email}
            />
            <Field
              id="website"
              name="website"
              type="url"
              label="Website"
              placeholder="Eg. https://www.google.com"
              error={errors?.website}
            />
          </div>
          <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
            <Field
              component={FileInput}
              id="logo"
              name="logo"
              label="Logo"
              required={false}
              accept="image/*"
              error={errors?.logo}
            />
            <Field
              component={Select}
              id="color"
              name="color"
              label="Brand color"
              options={BRAND_COLOR_OPTIONS_WITH_BALL}
              defaultOption={BRAND_COLOR_OPTIONS_WITH_BALL.find(function (
                option
              ) {
                return option.value === color;
              })}
              error={errors?.color}
              onChange={setColor}
            />
          </div>
          <Field
            component={Textarea}
            id="description"
            name="description"
            label="Description"
            placeholder="Describe what your organization does here..."
            rows="5"
            required={false}
            error={errors?.description}
          />

          <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
            <Field
              component={Slider}
              id="postCount"
              name="postCount"
              label="Number of posts"
              defaultValue={[postCount]}
              min={1}
              max={10}
              error={errors?.postCount}
              onChange={setPostCount}
            />

            <Field
              component={Select}
              id="expiresAfter"
              name="expiresAfter"
              label="Expires after"
              options={JOB_EXPIRE_OPTIONS}
              defaultOption={JOB_EXPIRE_OPTIONS[1]}
              error={errors?.expiresAfter}
            />
          </div>
        </div>
      </section>

      <section
        id="section-posts"
        className="flex flex-col items-stretch justify-start gap-6"
      >
        <h2 className="font-medium text-2xl">Fill posts</h2>

        <PostCardWrapper>
          {[...Array(postCount).keys()].map(function (i) {
            return (
              <Post
                key={i}
                i={i}
                errors={errors}
                className={
                  BRAND_COLOR_OPTIONS.find(function (option) {
                    return option.value === color;
                  })?.postBG ?? BRAND_COLOR_OPTIONS[0].postBG
                }
              />
            );
          })}
        </PostCardWrapper>
      </section>
    </Fragment>
  );
}
