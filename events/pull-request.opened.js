const messageForNewPRs =
  "Thanks for opening a new PR! Please follow our contributing guidelines to make your PR easier to review.";

async function handlePullRequestOpened({ octokit, payload }) {
  console.log(
    `Received a pull request event for #${payload.pull_request.number}`
  );

  try {
    // const octokit = await app.getInstallationOctokit(payload.installation.id);

    // const data = await octokit.request(
    //   "POST /repos/{orgs}/{repo}/pulls/{pull_number}/requested_reviewers",
    //   {
    //     orgs: payload.repository.owner.login,
    //     repo: payload.repository.name,
    //     pull_number: payload.pull_request.number,
    //     team_reviewers: ["web-team"],
    //     headers: {
    //       "X-GitHub-Api-Version": "2022-11-28",
    //     },
    //   }
    // );

    // console.log("Requested reviewers");
    // console.log(data);

    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees",
      {
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: payload.pull_request.number,
        assignees: ["aialok"],
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: payload.pull_request.number,
        body: messageForNewPRs,
        headers: {
          "x-github-api-version": "2022-11-28",
        },
      }
    );
  } catch (error) {
    if (error.response) {
      console.error(
        `Error! Status: ${error.response.status}. Message: ${error.response.data.message}`
      );
    }
    console.error(error);
  }
}


export default handlePullRequestOpened;
